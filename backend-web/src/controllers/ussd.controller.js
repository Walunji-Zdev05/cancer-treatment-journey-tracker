const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const SymptomReport = require('../models/SymptomReport');
const { normalizePhone } = require('../utils/phone');

const SYMPTOMS = { 1: 'nausea', 2: 'pain', 3: 'fever', 4: 'fatigue', 5: 'bleeding' };
const URGENT = ['fever', 'bleeding'];

exports.handle = async (req, res) => {
  res.set('Content-Type', 'text/plain');
  const { phoneNumber, text = '' } = req.body;

  const patient = await Patient.findOne({ phone: normalizePhone(phoneNumber) });
  if (!patient) return res.send('END This number is not registered. Please visit your clinic.');

  patient.lastContactAt = new Date();
  await patient.save();

  const steps = text === '' ? [] : text.split('*');

  if (steps.length === 0) {
    return res.send('CON Cancer Journey\n1. My next appointment\n2. Report a symptom');
  }

  if (steps[0] === '1') {
    const next = await Appointment.findOne({
      patient: patient._id, status: 'scheduled', scheduledDate: { $gte: new Date() },
    }).sort('scheduledDate');
    return res.send(next
      ? `END Your next ${next.type} visit: ${next.scheduledDate.toDateString()}`
      : 'END No upcoming visit found. Please contact your clinic.');
  }

  if (steps[0] === '2') {
    if (steps.length === 1) {
      return res.send('CON Main problem?\n1. Nausea/vomiting\n2. Pain\n3. Fever\n4. Tiredness\n5. Bleeding');
    }
    if (steps.length === 2) return res.send('CON How bad?\n1. Mild\n2. Moderate\n3. Severe');

    const symptom = SYMPTOMS[steps[1]];
    const severity = Number(steps[2]);
    if (!symptom || ![1, 2, 3].includes(severity)) return res.send('END Invalid choice. Please dial again.');

    await SymptomReport.create({ patient: patient._id, symptom, severity, channel: 'ussd' });

    const urgent = severity === 3 || URGENT.includes(symptom);
    return res.send(urgent
      ? 'END Please go to the nearest health facility today. A nurse has been alerted.'
      : 'END Thank you. A nurse will review your report.');
  }

  res.send('END Invalid choice. Please dial again.');
};