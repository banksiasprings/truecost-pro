#!/usr/bin/env python3
"""
update-rates.py  -  Weekly GitHub Action to refresh rates.json with current
Australian fuel prices (from AIP) and verify rego data.

Outputs: src/data/rates.json  (committed by the workflow)
"""

import json
import re
import sys
import urllib.request
from datetime import datetime, timezone

# ── Existing rates to use as fallback ──────────────────────────────────────
RATES_FILE = "src/data/rates.json"

def load_existing():
    try:
        with open(RATES_FILE) as f:
            return json.load(f)
    except Exception:
        return None

def fetch_url(url, timeout=10):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TrueCostRatesBot/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  [WARN] Failed to fetch {url}: {e}", file=sys.stderr)
        return None

def parse_aip_prices(html):
    """Try to extract average petrol and diesel prices from AIP page."""
    prices = {}
    if not html:
        return prices

    # Look for patterns like "175.5" or "189.0" near fuel type keywords
    # AIP pages typically show prices in tables; we look for decimal numbers near keywords
    ulp_match = re.search(r"(?:ULP|Unleaded|91)[^\d]{0,30}(\d{2,3}\.?\d?)\s*(?:c/L|cpl|cents)", html, re.IGNORECASE)
    diesel_match = re.search(r"(?:Diesel)[^\d]{0,30}(\d{2,3}\.?\d?)\s*(?:c/L|cpl|cents)", html, re.IGNORECASE)
    premium_match = re.search(r"(?:Premium|PULP|98)[^\d]{0,30}(\d{2,3}\.?\d?)\s*(?:c/L|cpl|cents)", html, re.IGNORECASE)

    if ulp_match:
        prices["ulp91"] = float(ulp_match.group(1))
    if diesel_match:
        prices["diesel"] = float(diesel_match.group(1))
    if premium_match:
        prices["premium98"] = float(premium_match.group(1))

    return prices

def get_live_fuel_prices(existing_fuel):
    """Attempt to fetch live prices, fall back to existing if unavailable."""
    fuel = dict(existing_fuel)  # start with existing

    print("  Fetching AIP pricing page...")
    html = fetch_url("https://aip.com.au/pricing")
    parsed = parse_aip_prices(html) if html else {}

    if parsed:
        print(f"  Parsed prices: {parsed}")
        fuel.update(parsed)
        # Derive premium95 as midpoint if we have ulp91 and premium98
        if "ulp91" in parsed and "premium98" in parsed:
            fuel["premium95"] = round((parsed["ulp91"] + parsed["premium98"]) / 2, 1)
    else:
        print("  Could not parse live prices — keeping existing values")

    return fuel

def main():
    print(f"TrueCost rate updater  {datetime.now(timezone.utc).isoformat()}")
    existing = load_existing() or {}

    existing_fuel = existing.get("fuel", {
        "ulp91": 175, "premium95": 190, "premium98": 205,
        "diesel": 185, "lpg": 88,
        "evHomeRate": 30, "evPublicRate": 60,
    })

    fuel = get_live_fuel_prices(existing_fuel)

    # Build updated rates object
    rates = {
        "meta": {
            "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "source": "AIP (fuel) + state transport departments (rego)",
            "version": existing.get("meta", {}).get("version", "1.0"),
            "notes": "Rego totals are estimates including CTP where bundled.",
        },
        "fuel": fuel,
        # Keep existing rego/stampDuty - only updated when manually verified
        "registration": existing.get("registration", {}),
        "stampDuty": existing.get("stampDuty", {}),
    }

    with open(RATES_FILE, "w") as f:
        json.dump(rates, f, indent=2)
    print(f"  Written: {RATES_FILE}")
    print(f"  Fuel prices: {fuel}")

if __name__ == "__main__":
    main()
