// TRUE COST — australia.js
// Australian state registration costs and fuel price defaults.
// Update annually from state revenue office websites.
// All monetary values in AUD.

const AustraliaData = {

  // ── Registration annual costs by state (light vehicle, under 4.5t) ──
  // Calculated based on cylinders or tare weight depending on state
  // QLD rates updated 1 April 2026 (qld.gov.au/transport/registration/fees/cost)
  // Other states current as of 2024-2025 financial year — update annually
  registration: {
    QLD: {
      // Cylinder-based. EVs/PHEVs/steam are in the '1–3 cyl/electric' band (cheapest).
      // base = registration fee + traffic improvement fee ($65.05); ctp = avg CTP insurance
      // Source: qld.gov.au/transport/registration/fees/cost (1 April 2026 rates)
      cylinders: {
        electric: { base: 358, ctp: 409 }, // EV / PHEV / steam / 1–3 cyl  ($293.20 + $65.05 reg, ~$409 CTP)
        4:        { base: 438, ctp: 409 }, // 4-cyl                          ($372.85 + $65.05 reg)
        6:        { base: 655, ctp: 409 }, // 5–6-cyl                        ($590.35 + $65.05 reg)
        8:        { base: 892, ctp: 409 }, // 7–8-cyl                        ($826.75 + $65.05 reg)
        12:       { base: 1035, ctp: 409 },// 9–12-cyl                       ($969.65 + $65.05 reg)
      },
    },
    NSW: {
      // Weight-based (tare weight in kg)
      // Current NSW Roads & Maritime sliding scale (2024-25)
      weight: {
        975:   { base: 394, ctp: 500 },   // up to 975 kg
        1154:  { base: 419, ctp: 500 },   // 976-1154 kg
        1504:  { base: 470, ctp: 500 },   // 1155-1504 kg
        2054:  { base: 548, ctp: 500 },   // 1505-2054 kg
        9999:  { base: 661, ctp: 500 },   // 2055+ kg
      },
    },
    VIC: {
      // Cylinder-based (TAC levy included, no separate CTP line)
      // EVs pay the lowest cylinder band in VIC
      cylinders: {
        electric: { base: 396, ctp: 0 }, // EV / PHEV — same as 4-cyl in VIC (2024-25)
        4: { base: 396, ctp: 0 },        // 4-cyl
        6: { base: 478, ctp: 0 },        // 6-cyl
        8: { base: 614, ctp: 0 },        // 8-cyl+
      },
    },
    SA: {
      // Engine capacity (cc) based
      cc: {
        1500: { base: 244, ctp: 380 },    // up to 1500 cc
        1799: { base: 285, ctp: 380 },    // 1501-1799 cc
        2598: { base: 325, ctp: 380 },    // 1800-2598 cc
        9999: { base: 400, ctp: 380 },    // 2599+ cc
      },
    },
    WA: {
      // Weight-based (tare weight in kg)
      weight: {
        1200: { base: 264, ctp: 380 },    // up to 1200 kg
        1500: { base: 316, ctp: 380 },    // 1201-1500 kg
        1800: { base: 368, ctp: 380 },    // 1501-1800 kg
        9999: { base: 420, ctp: 380 },    // 1801+ kg
      },
    },
    ACT: {
      // Value + emissions based — simplified as cylinder bands
      // ACT waives registration fees for EVs (zero-emission vehicles)
      cylinders: {
        electric: { base: 0, ctp: 0 }, // EV — ACT waives rego for zero-emission vehicles
        4: { base: 274, ctp: 0 },      // 4-cyl
        6: { base: 360, ctp: 0 },      // 6-cyl
        8: { base: 450, ctp: 0 },      // 8-cyl+
      },
    },
    TAS: {
      // Cylinder-based
      cylinders: {
        electric: { base: 195, ctp: 340 }, // EV — lowest band (2024-25)
        4: { base: 195, ctp: 340 },        // 4-cyl
        6: { base: 260, ctp: 340 },        // 6-cyl
        8: { base: 340, ctp: 340 },        // 8-cyl+
      },
    },
    NT: {
      // Relatively flat structure, cylinder-influenced
      cylinders: {
        electric: { base: 172, ctp: 300 }, // EV — lowest band (2024-25)
        4: { base: 172, ctp: 300 },        // 4-cyl
        6: { base: 214, ctp: 300 },        // 6-cyl
        8: { base: 258, ctp: 300 },        // 8-cyl+
      },
    },
  },

  // ── Stamp duty rates by state (% of vehicle value) ──
  // Rate varies by value band — simplified single rate here
  stampDuty: {
    QLD: { rate: 0.031, notes: '3.1% for vehicles under $100k' },
    NSW: { rate: 0.030, notes: '3% general rate' },
    VIC: { rate: 0.055, notes: '5.5% general rate' },
    SA:  { rate: 0.040, notes: '4% general rate' },
    WA:  { rate: 0.030, notes: '3% general rate' },
    ACT: { rate: 0.030, notes: '3% general rate' },
    TAS: { rate: 0.030, notes: '3% general rate' },
    NT:  { rate: 0.030, notes: '3% general rate' },
  },

  // ── Fuel price defaults (cents per litre) ──
  // Source: AIP weekly average — update periodically or use live API
  fuel: {
    unleaded:   205,  // ULP 91 — updated Apr 2026 (post-excise-cut)  // ULP 91
    premium:    209,  // ULP 98
    diesel:     199,
    lpg:        90,
    // EV charging (cents per kWh)
    evHomeRate: 30,   // typical off-peak home tariff
    evPublicRate: 60, // typical public fast charger
  },

  // ── Default insurance annual cost by category ──
  insurance: {
    budget:   800,
    standard: 1400,
    premium:  2200,
  },

  // ── Default tyre costs by category ──
  tyres: {
    small:   { cost: 600,  lifeKm: 40000 },  // city car / small hatch
    medium:  { cost: 900,  lifeKm: 45000 },  // medium sedan / family
    large:   { cost: 1200, lifeKm: 50000 },  // SUV / large sedan
    prestige:{ cost: 2000, lifeKm: 35000 },  // performance / prestige
    ev:      { cost: 1100, lifeKm: 35000 },  // EVs wear tyres faster
  },

};

// Function to calculate registration cost based on state and vehicle params.
// fuelType: 'petrol'|'diesel'|'hybrid'|'phev'|'electric'|'lpg' — used to route EVs/PHEVs
// Returns { base, ctp, total } in AUD
function calculateStateRegistration(state, cylinders, tarenWeightKg, fuelType) {
  if (!state) return null;

  const regoData = AustraliaData.registration[state];
  if (!regoData) return null;

  // Electric vehicles (BEV) and plug-in hybrids (PHEV) are treated as
  // the EV/zero-emission band in states that have one.
  const isEV = fuelType === 'electric' || fuelType === 'phev';

  let base = 0, ctp = 0;

  // Weight-based states (NSW, WA) — EVs just use their actual tare weight
  if (regoData.weight) {
    const weight = tarenWeightKg || 1400; // default middle estimate
    const weights = Object.keys(regoData.weight)
      .map(w => ({ limit: parseInt(w), data: regoData.weight[w] }))
      .sort((a, b) => a.limit - b.limit);

    const band = weights.find(w => weight <= w.limit);
    if (band) {
      base = band.data.base;
      ctp = band.data.ctp;
    }
  }
  // Engine capacity based (SA) — EVs get lowest cc band
  else if (regoData.cc) {
    const cc = isEV ? 0
      : cylinders ? (cylinders <= 4 ? 1300 : cylinders <= 6 ? 1900 : 2600) : 1800;
    const ccBands = Object.keys(regoData.cc)
      .map(c => ({ limit: parseInt(c), data: regoData.cc[c] }))
      .sort((a, b) => a.limit - b.limit);

    // EVs use lowest band; ICE vehicles find the matching band
    const band = isEV ? ccBands[0] : ccBands.find(c => cc <= c.limit);
    if (band) {
      base = band.data.base;
      ctp = band.data.ctp;
    }
  }
  // Cylinder-based states (QLD, VIC, ACT, TAS, NT)
  else if (regoData.cylinders) {
    let cylData;
    if (isEV && regoData.cylinders['electric']) {
      // EVs/PHEVs get their own 'electric' band (e.g. QLD 1-3 cyl/electric rate)
      cylData = regoData.cylinders['electric'];
    } else {
      const cyl = cylinders || 4; // ICE: default to 4-cyl if not specified
      let cylBand = 4;
      if (cyl >= 12) cylBand = 12;
      else if (cyl >= 8) cylBand = 8;
      else if (cyl >= 6) cylBand = 6;
      else cylBand = 4;
      cylData = regoData.cylinders[cylBand] || regoData.cylinders[4];
    }

    if (cylData) {
      base = cylData.base;
      ctp = cylData.ctp;
    }
  }

  const total = base + ctp;
  return { base, ctp, total };
}

// Freeze to prevent accidental mutation
Object.freeze(AustraliaData);
