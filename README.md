# TRUE COST

A Progressive Web App for calculating the true total cost of vehicle ownership over time.

Built with vanilla JS, IndexedDB, Chart.js, and a Service Worker — no build step, no frameworks.

## Live app

**[https://banksiasprings.github.io/truecost/](https://banksiasprings.github.io/truecost/)**
## Install on Android

Download the latest APK from the [Releases page](https://github.com/banksiasprings/truecost/releases/tag/android-latest) and install it directly on your Android phone — no Play Store required.

1. Download **truecost.apk** from Releases
2. Open the file on your Android phone
3. Enable **Install from unknown sources** if prompted
4. Tap Install

Requires Android 7.0+ with Chrome installed. The app runs as a Trusted Web Activity (TWA) wrapping the hosted PWA.



## Features

- Add multiple vehicles (petrol, diesel, hybrid, PHEV, EV)
- Australian cost presets (rego, insurance, servicing, tyres by fuel type)
- Customisable ownership scenario (years, km/year, opportunity cost rate)
- Side-by-side comparison with bar charts and year-by-year cumulative cost lines
- Per-vehicle detail view with donut chart and full cost breakdown
- Works offline via Service Worker
- Installable as a PWA on iOS/Android/desktop

## Phases

- [x] Phase 1 — Core data model & add/edit/delete vehicles (IndexedDB)
- [x] Phase 2 — Comparison charts (Chart.js bar chart, 4-vehicle max)
- [x] Phase 3 — Australian cost presets (fuel type defaults, registration, insurance)
- [x] Phase 4 — Settings screen (scenario years, km/yr, opportunity cost rate)
- [x] Phase 5 — Year-by-year cumulative cost chart (line chart, data table with cheapest highlights)
- [x] Phase 6 — Vehicle detail view (donut chart breakdown, edit/delete from detail page)

## Development

No build step. Open `src/index.html` directly, or serve via any static file server:

```bash
npx serve src
```

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`. See `.github/workflows/deploy.yml`.
