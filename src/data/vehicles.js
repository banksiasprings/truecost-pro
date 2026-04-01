// TRUE COST — data/vehicles.js
// Curated database of popular Australian vehicles with real-world specs.
// Data sourced from manufacturer specifications and VFACTS sales data.
// Purchase prices are approximate new drive-away for 2024 model year.

const VEHICLE_PRESETS = [
  // ─── UTES ───────────────────────────────────────────────────────────────
  {
    category: 'Ute',
    make: 'Toyota', model: 'HiLux', variant: 'SR5 Double Cab 4x4',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 8.3, purchasePrice: 62490, resaleValue5yr: 40000,
    serviceCostPerService: 280, serviceIntervalKm: 10000,
    tyreCostPerSet: 900, tyreLifeKm: 50000, insuranceAnnual: 1900,
  },
  {
    category: 'Ute',
    make: 'Ford', model: 'Ranger', variant: 'XLT Double Cab 4x4',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 7.5, purchasePrice: 58490, resaleValue5yr: 36000,
    serviceCostPerService: 299, serviceIntervalKm: 15000,
    tyreCostPerSet: 900, tyreLifeKm: 50000, insuranceAnnual: 1800,
  },
  {
    category: 'Ute',
    make: 'Ford', model: 'Ranger', variant: 'Raptor 4x4',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 9.6, purchasePrice: 82490, resaleValue5yr: 55000,
    serviceCostPerService: 350, serviceIntervalKm: 15000,
    tyreCostPerSet: 1100, tyreLifeKm: 40000, insuranceAnnual: 2200,
  },
  {
    category: 'Ute',
    make: 'Mitsubishi', model: 'Triton', variant: 'GLS Double Cab 4x4',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 6.9, purchasePrice: 51490, resaleValue5yr: 30000,
    serviceCostPerService: 240, serviceIntervalKm: 15000,
    tyreCostPerSet: 800, tyreLifeKm: 50000, insuranceAnnual: 1600,
  },
  {
    category: 'Ute',
    make: 'Isuzu', model: 'D-MAX', variant: 'LS-U Double Cab 4x4',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 7.7, purchasePrice: 54990, resaleValue5yr: 33000,
    serviceCostPerService: 260, serviceIntervalKm: 10000,
    tyreCostPerSet: 850, tyreLifeKm: 50000, insuranceAnnual: 1700,
  },
  // ─── LARGE SUVs ──────────────────────────────────────────────────────────
  {
    category: 'Large SUV',
    make: 'Toyota', model: 'LandCruiser 300', variant: 'GX Diesel',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 11.5, purchasePrice: 91500, resaleValue5yr: 68000,
    serviceCostPerService: 380, serviceIntervalKm: 10000,
    tyreCostPerSet: 1200, tyreLifeKm: 50000, insuranceAnnual: 2500,
  },
  {
    category: 'Large SUV',
    make: 'Toyota', model: 'Prado', variant: 'GX Diesel',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 8.9, purchasePrice: 72990, resaleValue5yr: 50000,
    serviceCostPerService: 350, serviceIntervalKm: 10000,
    tyreCostPerSet: 1100, tyreLifeKm: 50000, insuranceAnnual: 2100,
  },
  {
    category: 'Large SUV',
    make: 'Nissan', model: 'Patrol', variant: 'Ti-L Diesel',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 11.8, purchasePrice: 97000, resaleValue5yr: 58000,
    serviceCostPerService: 350, serviceIntervalKm: 10000,
    tyreCostPerSet: 1200, tyreLifeKm: 50000, insuranceAnnual: 2400,
  },
  {
    category: 'Large SUV',
    make: 'Jeep', model: 'Wrangler', variant: 'Unlimited Rubicon',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 12.8, purchasePrice: 79950, resaleValue5yr: 42000,
    serviceCostPerService: 320, serviceIntervalKm: 12000,
    tyreCostPerSet: 1200, tyreLifeKm: 40000, insuranceAnnual: 2200,
  },
  // ─── MID SUVs ────────────────────────────────────────────────────────────
  {
    category: 'SUV',
    make: 'Toyota', model: 'RAV4', variant: 'GX 2WD Petrol',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 7.4, purchasePrice: 37590, resaleValue5yr: 22000,
    serviceCostPerService: 180, serviceIntervalKm: 15000,
    tyreCostPerSet: 700, tyreLifeKm: 50000, insuranceAnnual: 1500,
  },
  {
    category: 'SUV',
    make: 'Toyota', model: 'RAV4', variant: 'GXL Hybrid AWD',
    year: 2024, fuelType: 'hybrid',
    fuelConsumption: 4.7, purchasePrice: 47490, resaleValue5yr: 30000,
    serviceCostPerService: 180, serviceIntervalKm: 15000,
    tyreCostPerSet: 700, tyreLifeKm: 50000, insuranceAnnual: 1600,
  },
  {
    category: 'SUV',
    make: 'Mazda', model: 'CX-5', variant: 'Maxx Sport FWD Petrol',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 7.5, purchasePrice: 38000, resaleValue5yr: 22000,
    serviceCostPerService: 170, serviceIntervalKm: 12500,
    tyreCostPerSet: 700, tyreLifeKm: 50000, insuranceAnnual: 1500,
  },
  {
    category: 'SUV',
    make: 'Mazda', model: 'CX-5', variant: 'Maxx Sport AWD Diesel',
    year: 2024, fuelType: 'diesel',
    fuelConsumption: 5.8, purchasePrice: 43000, resaleValue5yr: 26000,
    serviceCostPerService: 190, serviceIntervalKm: 12500,
    tyreCostPerSet: 700, tyreLifeKm: 50000, insuranceAnnual: 1550,
  },
  {
    category: 'SUV',
    make: 'Hyundai', model: 'Tucson', variant: 'Active 2WD Petrol',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 7.8, purchasePrice: 36500, resaleValue5yr: 20000,
    serviceCostPerService: 190, serviceIntervalKm: 15000,
    tyreCostPerSet: 650, tyreLifeKm: 50000, insuranceAnnual: 1450,
  },
  {
    category: 'SUV',
    make: 'Kia', model: 'Sportage', variant: 'Sport FWD',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 7.2, purchasePrice: 36000, resaleValue5yr: 19000,
    serviceCostPerService: 190, serviceIntervalKm: 15000,
    tyreCostPerSet: 650, tyreLifeKm: 50000, insuranceAnnual: 1400,
  },
  {
    category: 'SUV',
    make: 'Subaru', model: 'Forester', variant: '2.5i-L AWD',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 8.0, purchasePrice: 42000, resaleValue5yr: 25000,
    serviceCostPerService: 200, serviceIntervalKm: 12500,
    tyreCostPerSet: 700, tyreLifeKm: 50000, insuranceAnnual: 1500,
  },
  {
    category: 'SUV',
    make: 'Mitsubishi', model: 'Outlander', variant: 'PHEV AWD',
    year: 2024, fuelType: 'phev',
    fuelConsumption: 1.9, evConsumptionKwh: 18,
    phevElectricRangeKm: 84, phevElectricPct: 50,
    evBatteryKwh: 20, evRangeKm: 84,
    purchasePrice: 56490, resaleValue5yr: 30000,
    serviceCostPerService: 250, serviceIntervalKm: 15000,
    tyreCostPerSet: 750, tyreLifeKm: 50000, insuranceAnnual: 1700,
  },
  {
    category: 'SUV',
    make: 'Honda', model: 'CR-V', variant: 'e:HEV L AWD',
    year: 2024, fuelType: 'hybrid',
    fuelConsumption: 5.4, purchasePrice: 54900, resaleValue5yr: 30000,
    serviceCostPerService: 190, serviceIntervalKm: 12000,
    tyreCostPerSet: 720, tyreLifeKm: 50000, insuranceAnnual: 1650,
  },
  // ─── SMALL SUVs / HATCHES ─────────────────────────────────────────────────
  {
    category: 'Small Car',
    make: 'Toyota', model: 'Corolla', variant: 'Ascent Hatch',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 7.0, purchasePrice: 27190, resaleValue5yr: 14000,
    serviceCostPerService: 150, serviceIntervalKm: 15000,
    tyreCostPerSet: 550, tyreLifeKm: 50000, insuranceAnnual: 1200,
  },
  {
    category: 'Small Car',
    make: 'Toyota', model: 'Corolla Cross', variant: 'GX Hybrid',
    year: 2024, fuelType: 'hybrid',
    fuelConsumption: 4.3, purchasePrice: 35000, resaleValue5yr: 20000,
    serviceCostPerService: 150, serviceIntervalKm: 15000,
    tyreCostPerSet: 580, tyreLifeKm: 50000, insuranceAnnual: 1300,
  },
  {
    category: 'Small Car',
    make: 'Mazda', model: 'Mazda3', variant: 'G20 Pure Hatch',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 6.2, purchasePrice: 28000, resaleValue5yr: 15000,
    serviceCostPerService: 170, serviceIntervalKm: 12500,
    tyreCostPerSet: 600, tyreLifeKm: 50000, insuranceAnnual: 1200,
  },
  {
    category: 'Small Car',
    make: 'Honda', model: 'HR-V', variant: 'e:HEV L',
    year: 2024, fuelType: 'hybrid',
    fuelConsumption: 5.0, purchasePrice: 38500, resaleValue5yr: 22000,
    serviceCostPerService: 190, serviceIntervalKm: 12000,
    tyreCostPerSet: 650, tyreLifeKm: 50000, insuranceAnnual: 1350,
  },
  {
    category: 'Small Car',
    make: 'Volkswagen', model: 'Golf', variant: '110TSI Life',
    year: 2024, fuelType: 'petrol',
    fuelConsumption: 6.8, purchasePrice: 39990, resaleValue5yr: 20000,
    serviceCostPerService: 220, serviceIntervalKm: 15000,
    tyreCostPerSet: 650, tyreLifeKm: 50000, insuranceAnnual: 1400,
  },
  // ─── ELECTRIC ────────────────────────────────────────────────────────────
  {
    category: 'EV',
    make: 'Tesla', model: 'Model 3', variant: 'RWD',
    year: 2024, fuelType: 'electric',
    evConsumptionKwh: 14.9, evBatteryKwh: 60, evRangeKm: 556,
    purchasePrice: 64900, resaleValue5yr: 35000,
    serviceCostPerService: 150, serviceIntervalKm: 20000,
    tyreCostPerSet: 750, tyreLifeKm: 40000, insuranceAnnual: 1800,
  },
  {
    category: 'EV',
    make: 'Tesla', model: 'Model Y', variant: 'RWD',
    year: 2024, fuelType: 'electric',
    evConsumptionKwh: 15.7, evBatteryKwh: 75, evRangeKm: 533,
    purchasePrice: 72900, resaleValue5yr: 40000,
    serviceCostPerService: 150, serviceIntervalKm: 20000,
    tyreCostPerSet: 800, tyreLifeKm: 40000, insuranceAnnual: 1900,
  },
  {
    category: 'EV',
    make: 'BYD', model: 'Atto 3', variant: 'Extended Range',
    year: 2024, fuelType: 'electric',
    evConsumptionKwh: 15.0, evBatteryKwh: 60.5, evRangeKm: 420,
    purchasePrice: 44990, resaleValue5yr: 22000,
    serviceCostPerService: 120, serviceIntervalKm: 30000,
    tyreCostPerSet: 700, tyreLifeKm: 40000, insuranceAnnual: 1500,
  },
  {
    category: 'EV',
    make: 'MG', model: 'ZS EV', variant: 'Long Range',
    year: 2024, fuelType: 'electric',
    evConsumptionKwh: 16.0, evBatteryKwh: 72.6, evRangeKm: 440,
    purchasePrice: 38990, resaleValue5yr: 18000,
    serviceCostPerService: 120, serviceIntervalKm: 15000,
    tyreCostPerSet: 600, tyreLifeKm: 40000, insuranceAnnual: 1400,
  },
  {
    category: 'EV',
    make: 'Kia', model: 'EV6', variant: 'Air RWD',
    year: 2024, fuelType: 'electric',
    evConsumptionKwh: 16.5, evBatteryKwh: 77.4, evRangeKm: 528,
    purchasePrice: 67000, resaleValue5yr: 36000,
    serviceCostPerService: 200, serviceIntervalKm: 15000,
    tyreCostPerSet: 800, tyreLifeKm: 40000, insuranceAnnual: 1800,
  },
  {
    category: 'EV',
    make: 'Hyundai', model: 'IONIQ 6', variant: 'Standard Range RWD',
    year: 2024, fuelType: 'electric',
    evConsumptionKwh: 13.8, evBatteryKwh: 53, evRangeKm: 429,
    purchasePrice: 62000, resaleValue5yr: 33000,
    serviceCostPerService: 200, serviceIntervalKm: 15000,
    tyreCostPerSet: 750, tyreLifeKm: 40000, insuranceAnnual: 1700,
  },
];

// Simple search: returns presets matching query across make/model/variant/category
function searchVehiclePresets(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  const terms = q.split(/\s+/);

  return VEHICLE_PRESETS.filter(p => {
    const haystack = [p.make, p.model, p.variant, p.category, p.fuelType]
      .join(' ').toLowerCase();
    return terms.every(t => haystack.includes(t));
  }).slice(0, 7);
}

window.VehiclePresets = {
  all: VEHICLE_PRESETS,
  search: searchVehiclePresets,
};
