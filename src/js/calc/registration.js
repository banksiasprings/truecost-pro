// TRUE COST - calc/registration.js
// Annual registration cost calculation.
function calcRegistration(vehicle, scenario) {
  // Use vehicle-specific value first
  let annualCost = vehicle.registrationAnnual;

  if (!annualCost && vehicle.state) {
    // Prefer live rates if available, fall back to AustraliaData
    const regoData = (window.LiveRates && window.LiveRates.registration && window.LiveRates.registration[vehicle.state])
      ? window.LiveRates.registration[vehicle.state]
      : AustraliaData.registration[vehicle.state];
    if (regoData) annualCost = regoData.total;
  }

  annualCost = annualCost || Defaults.vehicle.registrationAnnual;

  const total = annualCost * scenario.years;
  const km = scenario.years * scenario.kmPerYear;
  const perKm = km > 0 ? total / km : 0;
  return { total, perKm, perYear: annualCost };
}
