const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const SymptomReport = require('../models/SymptomReport');

const NO_CONTACT_DAYS = 14;

exports.getAtRisk = async (facility) => {
  const filter = { status: 'active' };
  if (facility) filter.facility = facility;

  const patients = await Patient.find(filter)
    .select('fullName phone village district lastContactAt assignedNavigator');
  const byId = new Map(patients.map((p) => [String(p._id), p]));
  const ids = [...byId.keys()];

  const [missed, severe] = await Promise.all([
    Appointment.find({ patient: { $in: ids }, status: 'missed', followedUp: false }),
    SymptomReport.find({ patient: { $in: ids }, severity: 3, resolved: false }),
  ]);

  const result = new Map();
  const add = (patient, reason, weight) => {
    const key = String(patient._id);
    const entry = result.get(key) || { patient, reasons: [], score: 0 };
    entry.reasons.push(reason);
    entry.score += weight;
    result.set(key, entry);
  };

  missed.forEach((a) => add(byId.get(String(a.patient)), 'Missed appointment', 3));
  severe.forEach((s) => add(byId.get(String(s.patient)), `Severe symptom: ${s.symptom}`, 4));

  const cutoff = new Date(Date.now() - NO_CONTACT_DAYS * 864e5);
  patients.forEach((p) => {
    if (!p.lastContactAt || p.lastContactAt < cutoff) {
      add(p, `No contact in ${NO_CONTACT_DAYS}+ days`, 2);
    }
  });

  return [...result.values()].sort((a, b) => b.score - a.score);
};