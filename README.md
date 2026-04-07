# 💰 TRUE COST

[![Live Demo](https://img.shields.io/badge/live%20demo-truecost-brightgreen)](https://banksiasprings.github.io/truecost/)

Calculate the true total cost of vehicle ownership in Australia. Account for depreciation, fuel, insurance, registration, servicing, tyres, stamp duty, and lost capital. Compare vehicles side-by-side with detailed breakdowns.

## ✨ Features

- **202 Vehicle Presets** – Popular cars, trucks, and commercial vehicles across 10 categories
- **Depreciation Calc** – Accurate loss-of-value models for different vehicle types
- **Fuel Economy** – Compare consumption across petrol, diesel, hybrid, PHEV, and EV
- **Insurance Quotes** – Integrated estimate tool based on vehicle and driver profile
- **Registration** – State-specific rego costs for all Australian jurisdictions
- **Servicing Costs** – Maintenance schedules with real pricing data
- **Tyres & Servicing** – Detailed breakdown of consumable costs
- **Stamp Duty** – State-specific purchase tax calculations
- **EV Concessions** – Special incentives and rebates for electric vehicles
- **Multi-Compare** – Compare vehicles side-by-side with charts
- **Offline Support** – Full PWA with service worker caching
- **Interactive Charts** – Bar and line charts showing cost trends
- **Responsive Design** – Works on desktop, tablet, and mobile
- **Version:** v13

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Charting:** Chart.js for visual comparisons
- **Storage:** IndexedDB for vehicle database
- **PWA:** Service Worker for offline functionality
- **Hosting:** GitHub Pages
- **No dependencies** – Pure HTML, CSS, JavaScript

## 🚀 Getting Started

### Online
Open https://banksiasprings.github.io/truecost/ in your browser and start comparing vehicles instantly!

### Development
```bash
git clone https://github.com/banksiasprings/truecost.git
cd truecost
# Serve the src directory with any static file server
python3 -m http.server 8000 --directory src
# Open http://localhost:8000 in your browser
```

### Mobile APK
Download the Android APK from [releases](https://github.com/banksiasprings/truecost/releases) to install as a native app.

## 📊 Data

The vehicle database includes:
- 202 Australian vehicle presets
- Latest pricing and specification data
- Real-world fuel consumption figures
- Current insurance and registration rates

All calculations are based on publicly available Australian automotive data sources.

## 📄 License

MIT – See LICENSE file for details

---

**Found a bug or have a suggestion?** [Open an issue](https://github.com/banksiasprings/truecost/issues). **Want to contribute?** PRs welcome!
