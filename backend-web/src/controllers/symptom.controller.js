const SymptomReport = require('../models/SymptomReport');
const Patient = require('../models/Patient');

// Staff record a symptom reported by phone or in person
exports.create = async (req, res) => {
  const patient = await Patient.findById(req.body.patient);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  const report = await SymptomReport.create({
    patient: patient._id,
    symptom: req.body.symptom,
    severity: req.body.severity,
    channel: 'staff',
  });
  res.status(201).json(report);
};

// Most severe and newest first
exports.list = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const filter = {};
  if (req.query.resolved !== undefined) filter.resolved = req.query.resolved === 'true';
  if (req.query.severity) filter.severity = Number(req.query.severity);

  if (req.user.role !== 'admin') {
    const ids = await Patient.find({ facility: req.user.facility }).distinct('_id');
    filter.patient = { $in: ids };
  }

  const [items, total] = await Promise.all([
    SymptomReport.find(filter)
      .populate('patient', 'fullName phone village district')
      .sort('-severity -createdAt')
      .skip((page - 1) * limit)
      .limit(limit),
    SymptomReport.countDocuments(filter),
  ]);
  res.json({ items, total, page });
};

exports.resolve = async (req, res) => {
  const report = await SymptomReport.findByIdAndUpdate(
    req.params.id,
    { resolved: true, reviewedBy: req.user._id },
    { new: true }
  );
  if (!report) return res.status(404).json({ message: 'Report not found' });

  await Patient.findByIdAndUpdate(report.patient, { lastContactAt: new Date() });
  res.json(report);
};