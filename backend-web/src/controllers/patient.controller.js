const Patient = require('../models/Patient');

const makeCode = () => `CTJ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.create = async (req, res) => {
  const patient = await Patient.create({
    ...req.body,
    patientCode: makeCode(),
    facility: req.user.facility,
    assignedNavigator: req.body.assignedNavigator || undefined,
  });
  res.status(201).json(patient);
};

exports.list = async (req, res) => {
  const { status, district, q, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (district) filter.district = district;
  if (q) filter.fullName = new RegExp(escapeRegex(q), 'i');
  if (req.user.role !== 'admin') filter.facility = req.user.facility;

  const [items, total] = await Promise.all([
    Patient.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
    Patient.countDocuments(filter),
  ]);
  res.json({ items, total, page });
};

exports.getOne = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  res.json(patient);
};

exports.update = async (req, res) => {
  const allowed = ['fullName', 'phone', 'caregiverPhone', 'district', 'village', 'regimen',
    'plannedCycles', 'status', 'consentSms', 'preferredLanguage', 'assignedNavigator'];
  const changes = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  );
  const patient = await Patient.findByIdAndUpdate(req.params.id, changes, {
    new: true, runValidators: true,
  });
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  res.json(patient);
};