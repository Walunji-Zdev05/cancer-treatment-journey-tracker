const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientCode: { type: String, unique: true, required: true },
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true },
  caregiverPhone: String,
  sex: { type: String, enum: ['female', 'male'] },
  dateOfBirth: Date,
  district: String,
  village: String,
  preferredLanguage: { type: String, enum: ['en', 'ny', 'tum'], default: 'ny' },
  facility: { type: String, required: true },
  cancerType: { type: String, required: true },
  regimen: String,
  treatmentStartDate: { type: Date, required: true },
  plannedCycles: Number,
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned', 'transferred', 'deceased'],
    default: 'active',
  },
  consentSms: { type: Boolean, default: false },
  assignedNavigator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastContactAt: { type: Date, default: Date.now },
}, { timestamps: true });

patientSchema.index({ facility: 1, status: 1 });

module.exports = mongoose.model('Patient', patientSchema);