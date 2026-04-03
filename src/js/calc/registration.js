// TRUE COST - calc/registration.js
// Annual registration cost calculation based on state and vehicle parameters.
function calcRegistration(vehicle, scenario) {
  // Use vehicle-specific override value first
  let annualCost = vehicle.registrationAnnual;

  if (!annualCost && vehicle.state) {
    // Try to calculate from cylinders/weight using state-specific logic
    const calculated = calculateStateRegistration(vehicle.state, vehicle.cylinders, vehicle.tarenWeightKg);
    if (calculated) {
      annualCost = calculated.total;
    } else {
      // Fall back to live rates if available
      if (window.LiveRates && window.LiveRates.registration && window.LiveRates.registration[vehicle.state]) {
        annualCost = window.LiveRates.registration[vehicle.state].total;
      } else {
        // Last resort: use defaults
        annualCost = Defaults.vehicle.registrationAnnual;
      }
    }
  }

  annualCost = annualCost || Defaults.vehicle.registrationAnnual;

  const total = annualCost * scenario.years;
  const km = scenario.years * scenario.kmPerYear;
  const perKm = km > 0 ? total / km : 0;
  return { total, perKm, perYear: annualCost };
}
