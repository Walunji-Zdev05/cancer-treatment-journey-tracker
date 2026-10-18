const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  symptom: {
    type: String,
    enum: ['nausea', 'pain', 'fever', 'fatigue', 'bleeding', 'appetite_loss', 'other'],
    required: true,
  },
  severity: { type: Number, enum: [1, 2, 3], required: true }, // mild, moderate, severe
  channel: { type: String, enum: ['ussd', 'sms', 'staff'], default: 'ussd' },
  resolved: { type: Boolean, default: false },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('SymptomReport', symptomSchema);