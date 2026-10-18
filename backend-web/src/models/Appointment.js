const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  type: { type: String, enum: ['chemotherapy', 'radiation', 'review', 'lab'], required: true },
  scheduledDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['scheduled', 'attended', 'missed', 'rescheduled'],
    default: 'scheduled',
  },
  reminderSentAt: { type: Date, default: null },
  followedUp: { type: Boolean, default: false }, // staff reached the patient after a miss
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

appointmentSchema.index({ status: 1, scheduledDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);