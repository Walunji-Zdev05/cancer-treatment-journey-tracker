const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

exports.create = async (req, res) => {
  const patient = await Patient.findById(req.body.patient);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  const appt = await Appointment.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(appt);
};

exports.listForPatient = async (req, res) => {
  const items = await Appointment.find({ patient: req.params.patientId }).sort('scheduledDate');
  res.json(items);
};

exports.update = async (req, res) => {
  const { status, followedUp, scheduledDate, notes } = req.body;
  const appt = await Appointment.findByIdAndUpdate(
    req.params.id, { status, followedUp, scheduledDate, notes }, { new: true, runValidators: true }
  );
  if (!appt) return res.status(404).json({ message: 'Appointment not found' });

  if (status === 'attended' || followedUp) {
    await Patient.findByIdAndUpdate(appt.patient, { lastContactAt: new Date() });
  }
  res.json(appt);
};