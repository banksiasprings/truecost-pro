// TRUE COST - calc/fuel.js
// Pure functions for fuel / energy cost calculation.
// Uses window.LiveRates when available, falls back to vehicle values then AustraliaData.

function _fuelDefault(key, fallback) {
  if (window.LiveRates && window.LiveRates.fuel && window.LiveRates.fuel[key] !== undefined) {
    return window.LiveRates.fuel[key];
  }
  return fallback;
}

function calcFuel(vehicle, scenario) {
  const km = scenario.years * scenario.kmPerYear;
  let costPerKm = 0;

  if (vehicle.fuelType === "electric") {
    // EV: blend home and public charging tariffs
    const homePct = (100 - (vehicle.evPublicChargingPct || 0)) / 100;
    const pubPct  = (vehicle.evPublicChargingPct || 0) / 100;
    const homeRate   = vehicle.evChargingTariff  || _fuelDefault("evHomeRate",   AustraliaData.fuel.evHomeRate);
    const publicRate = vehicle.evPublicTariff    || _fuelDefault("evPublicRate", AustraliaData.fuel.evPublicRate);
    const blendedTariff = (homePct * homeRate) + (pubPct * publicRate); // cents/kWh
    // evConsumptionKwh is kWh/100km
    costPerKm = (vehicle.evConsumptionKwh / 100) * (blendedTariff / 100); // AUD/km

  } else if (vehicle.fuelType === "phev") {
    // PHEV: blend electric and petrol legs
    const elecFraction   = (vehicle.phevElectricPct || 50) / 100;
    const petrolFraction = 1 - elecFraction;
    const homePct   = (100 - (vehicle.evPublicChargingPct || 0)) / 100;
    const pubPct    = (vehicle.evPublicChargingPct || 0) / 100;
    const homeRate  = vehicle.evChargingTariff || _fuelDefault("evHomeRate",   AustraliaData.fuel.evHomeRate);
    const pubRate   = vehicle.evPublicTariff   || _fuelDefault("evPublicRate", AustraliaData.fuel.evPublicRate);
    const blended   = (homePct * homeRate) + (pubPct * pubRate);
    const evCostPerKm = (vehicle.evConsumptionKwh / 100) * (blended / 100);
    const fuelPrice = vehicle.fuelPricePerLitre || _fuelDefault("ulp91", AustraliaData.fuel.unleaded);
    const petrolCostPerKm = (vehicle.fuelConsumption / 100) * (fuelPrice / 100);
    costPerKm = (elecFraction * evCostPerKm) + (petrolFraction * petrolCostPerKm);

  } else {
    // ICE: petrol, diesel, hybrid, lpg
    let defaultPrice;
    if (vehicle.fuelType === "diesel") {
      defaultPrice = _fuelDefault("diesel", AustraliaData.fuel.diesel);
    } else if (vehicle.fuelType === "lpg") {
      defaultPrice = _fuelDefault("lpg", AustraliaData.fuel.lpg);
    } else {
      defaultPrice = _fuelDefault("ulp91", AustraliaData.fuel.unleaded);
    }
    const pricePerL = vehicle.fuelPricePerLitre || defaultPrice;
    // fuelConsumption = L/100km, pricePerL = cents/L
    costPerKm = (vehicle.fuelConsumption / 100) * (pricePerL / 100);
  }

  const total   = costPerKm * km;
  const perYear = costPerKm * scenario.kmPerYear;
  return { total, perKm: costPerKm, perYear };
}
