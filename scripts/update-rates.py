#!/usr/bin/env python3
"""
update-rates.py  -  Weekly GitHub Action to refresh rates.json with current
Australian fuel prices from AIP (Australian Institute of Petroleum).

Outputs: src/data/rates.json  (committed by the workflow)

AIP public API (no auth, HTTP only — SSL cert expired on api.aip.com.au):
  http://api.aip.com.au/public/nationalTable   — national + 5-city average
  http://api.aip.com.au/public/nswUlpTable     — NSW
  http://api.aip.com.au/public/melbourneUlpTable — VIC (Melbourne metro)
  http://api.aip.com.au/public/qldUlpTable     — QLD
  http://api.aip.com.au/public/saUlpTable      — SA
  http://api.aip.com.au/public/waUlpTable      — WA
  http://api.aip.com.au/public/tasUlpTable     — TAS
  http://api.aip.com.au/public/ntUlpTable      — NT

All endpoints return HTML tables (not JSON). We parse them with regex.
"""

import json
import re
import sys
import urllib.request
from datetime import datetime, timezone

RATES_FILE = "src/data/rates.json"
AIP_BASE   = "http://api.aip.com.au/public"

# Typical differentials when only ULP 91 national average is available
PREMIUM95_OFFSET = 15   # cents/L above ULP 91
PREMIUM98_OFFSET = 30   # cents/L above ULP 91

# Sanity bounds — reject values outside these (likely parse errors)
PRICE_MIN, PRICE_MAX = 80, 400


def load_existing():
    try:
        with open(RATES_FILE) as f:
            return json.load(f)
    except Exception:
        return {}


def fetch_url(url, timeout=12):
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "TrueCostRatesBot/1.0 (+https://github.com/banksiasprings/truecost)",
                "Accept": "text/html,*/*",
            }
        )
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  [WARN] fetch failed {url}: {e}", file=sys.stderr)
        return None


def strip_tags(text):
    """Remove HTML tags from a string."""
    return re.sub(r"<[^>]+>", "", text).strip()


def parse_price(text):
    """Extract a fuel price (cents/L) from a string. Returns None if not sane."""
    m = re.search(r"(\d{2,3}(?:\.\d)?)", text)
    if m:
        val = float(m.group(1))
        if PRICE_MIN <= val <= PRICE_MAX:
            return round(val, 1)
    return None


def parse_aip_table(html):
    """
    Parse an AIP HTML price table and return list of (label, price) pairs.

    AIP tables look like:
      <tr><td>National Average</td><td>253.4</td><td>...</td></tr>
    Column order varies — we grab the first numeric cell after the label cell.
    """
    results = []
    if not html:
        return results

    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.DOTALL | re.IGNORECASE)
    for row in rows:
        cells = re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.DOTALL | re.IGNORECASE)
        if len(cells) < 2:
            continue
        clean = [strip_tags(c) for c in cells]
        label = clean[0].lower().strip()
        if not label:
            continue
        for val_text in clean[1:]:
            price = parse_price(val_text)
            if price is not None:
                results.append((label, price))
                break

    return results


def get_national_fuel(existing_fuel):
    """
    Fetch national ULP average from AIP nationalTable.
    Returns updated fuel dict, falling back to existing values on any failure.
    """
    fuel = dict(existing_fuel)

    print("  Fetching AIP nationalTable...")
    html = fetch_url(f"{AIP_BASE}/nationalTable")
    if not html:
        print("  [WARN] Could not fetch national table — keeping existing values")
        return fuel

    rows = parse_aip_table(html)
    print(f"  Parsed {len(rows)} rows: {[r[0] for r in rows]}")

    if not rows:
        print("  [WARN] No rows parsed — keeping existing values")
        return fuel

    # Priority labels for the national ULP average
    ulp_labels = [
        "national average", "national ulp average", "nat'l avg", "national avg",
        "5 capital city average", "5 capital city avg", "average",
    ]

    ulp_price = None
    for label, price in rows:
        if any(label.startswith(k) or k in label for k in ulp_labels):
            ulp_price = price
            print(f"  Matched ULP label '{label}' → {price} c/L")
            break

    # Fallback: use the first row
    if ulp_price is None and rows:
        ulp_price = rows[0][1]
        print(f"  [INFO] Fallback to first row '{rows[0][0]}' → {ulp_price} c/L")

    if ulp_price and PRICE_MIN <= ulp_price <= PRICE_MAX:
        print(f"  ULP 91 national average: {ulp_price} c/L")
        fuel["ulp91"]     = ulp_price
        fuel["premium95"] = round(ulp_price + PREMIUM95_OFFSET, 1)
        fuel["premium98"] = round(ulp_price + PREMIUM98_OFFSET, 1)
    else:
        print("  [WARN] ULP price out of range or missing — keeping existing")

    # Diesel — try state/national diesel table or fallback column
    # AIP doesn't have a separate diesel national table endpoint; diesel
    # data occasionally appears as a second column in nationalTable rows.
    # Keep existing diesel value for now unless we find something better.

    return fuel


def main():
    now = datetime.now(timezone.utc)
    print(f"TrueCost rate updater  {now.isoformat()}")

    existing = load_existing()
    existing_fuel = existing.get("fuel", {
        "ulp91": 253, "premium95": 268, "premium98": 283,
        "diesel": 187, "lpg": 88,
        "evHomeRate": 30, "evPublicRate": 60,
    })

    fuel = get_national_fuel(existing_fuel)

    # Preserve LPG and EV rates — not tracked by AIP national table
    for key in ("lpg", "evHomeRate", "evPublicRate"):
        fuel.setdefault(key, existing_fuel.get(key, 0))

    rates = {
        "meta": {
            "updated": now.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "source":  "AIP weekly average (auto-updated every Monday)",
            "version": existing.get("meta", {}).get("version", "1.0"),
            "notes":   (
                "Fuel = AIP national weekly average (http://api.aip.com.au). "
                "Premium95/98 = ULP91 + typical differential. "
                "Rego = state transport dept estimates; CTP included where bundled."
            ),
        },
        "fuel":         fuel,
        "registration": existing.get("registration", {}),
        "stampDuty":    existing.get("stampDuty", {}),
    }

    with open(RATES_FILE, "w") as f:
        json.dump(rates, f, indent=2)

    print(f"\n  Written {RATES_FILE}")
    print(f"  Fuel: {fuel}")
    print("Done.")


if __name__ == "__main__":
    main()
