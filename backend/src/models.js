// ============================================================================
// TIKONDANE SHARED DATA MODELS (MongoDB / Mongoose)
// This file is the contract between all three backend areas.
// If you change a model, tell the other two people BEFORE merging.
// ============================================================================
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ref = (model, extra = {}) => ({ type: Schema.Types.ObjectId, ref: model, ...extra });

// One login collection for everyone. Phone number is the identity,
// so the USSD menu can look people up by phone too.
const User = mongoose.model('User', new Schema({
  role:         { type: String, enum: ['patient', 'navigator', 'admin'], required: true },
  phone:        { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  fullName:     { type: String, required: true, trim: true },
  language:     { type: String, enum: ['en', 'ny'], default: 'en' }, // ny = Chichewa
  createdAt:    { type: Date, default: Date.now },
}));

const Navigator = mongoose.model('Navigator', new Schema({
  user:     ref('User', { required: true, unique: true }),
  title:    { type: String, default: 'Oncology Navigator' },
  hospital: { type: String, required: true },
}));

// `status` is the flag the navigator dashboard shows.
// It is updated by services/followup.js, never edited by hand.
const Patient = mongoose.model('Patient', new Schema({
  user:          ref('User', { required: true, unique: true }),
  navigator:     ref('Navigator'),
  diagnosis:     String,
  hospital:      String,
  ward:          String,
  guardianName:  String,
  guardianPhone: String,
  status:        { type: String, enum: ['on_track', 'missed_1', 'missed_2_plus'], default: 'on_track' },
  registeredAt:  { type: Date, default: Date.now },
}));

const TreatmentPlan = mongoose.model('TreatmentPlan', new Schema({
  patient:      ref('Patient', { required: true, index: true }),
  protocolName: { type: String, required: true },  // "Chemotherapy Protocol"
  planName:     { type: String, required: true },  // "Breast Cancer Care Plan"
  detail:       String,
  totalCycles:  { type: Number, required: true },
  currentCycle: { type: Number, default: 1 },
  createdAt:    { type: Date, default: Date.now },
}));

const appointmentSchema = new Schema({
  patient:             ref('Patient', { required: true }),
  plan:                ref('TreatmentPlan'),
  kind:                { type: String, enum: ['chemo', 'radiation', 'scan', 'review', 'counselling', 'other'], default: 'chemo' },
  title:               { type: String, required: true },
  detail:              String,
  location:            String,
  scheduledAt:         { type: Date, required: true },
  status:              { type: String, enum: ['scheduled', 'confirmed', 'attended', 'missed'], default: 'scheduled' },
  reminderCount:       { type: Number, default: 0 },   // Person 3's reminder engine updates this
  confirmedAt:         Date,
  rescheduleRequested: { type: Boolean, default: false },
});
appointmentSchema.index({ patient: 1, scheduledAt: 1 });
const Appointment = mongoose.model('Appointment', appointmentSchema);

const Medication = mongoose.model('Medication', new Schema({
  patient:       ref('Patient', { required: true, index: true }),
  name:          { type: String, required: true },
  purpose:       String,
  instructions:  String,
  scheduledTime: { type: String, required: true, match: /^\d{2}:\d{2}$/ }, // 24h "HH:MM"
  active:        { type: Boolean, default: true },
}));

// One document per dose actually taken. No document for today = not taken yet.
const medLogSchema = new Schema({
  medication: ref('Medication', { required: true }),
  patient:    ref('Patient', { required: true }),
  logDate:    { type: String, required: true },          // "YYYY-MM-DD" (Malawi time)
  takenAt:    { type: Date, default: Date.now },
});
medLogSchema.index({ medication: 1, logDate: 1 }, { unique: true });
const MedicationLog = mongoose.model('MedicationLog', medLogSchema);

// Symptom + mood check-ins. Any answer may be missing (quick mood-only check-in).
const checkinSchema = new Schema({
  patient:   ref('Patient', { required: true }),
  mood:      { type: String, enum: ['great', 'okay', 'tired', 'pain'] },
  nausea:    { type: Number, min: 1, max: 5 },
  pain:      { type: Number, min: 0, max: 10 },
  energy:    { type: String, enum: ['good', 'moderate', 'bed'] },
  fever:     Boolean,
  severe:    { type: Boolean, default: false },          // true = nurse must be alerted
  createdAt: { type: Date, default: Date.now },
});
checkinSchema.index({ patient: 1, createdAt: -1 });
const Checkin = mongoose.model('Checkin', checkinSchema);

// Navigator's record of calls/SMS (Person 2 writes, everyone can read).
const ContactLog = mongoose.model('ContactLog', new Schema({
  patient:   ref('Patient', { required: true, index: true }),
  navigator: ref('Navigator'),
  channel:   { type: String, enum: ['call', 'sms', 'ussd', 'visit', 'system'], required: true },
  outcome:   String,
  notes:     String,
  createdAt: { type: Date, default: Date.now },
}));

// The navigator's to-do queue. Created automatically by services/followup.js.
const taskSchema = new Schema({
  patient:     ref('Patient', { required: true }),
  navigator:   ref('Navigator'),
  reason:      { type: String, required: true,
                 enum: ['missed_appointment', 'missed_2_plus', 'severe_symptom', 'reschedule_request', 'callback_request'] },
  priority:    { type: String, enum: ['normal', 'high'], default: 'normal' },
  note:        String,
  status:      { type: String, enum: ['open', 'done'], default: 'open' },
  createdAt:   { type: Date, default: Date.now },
  completedAt: Date,
});
// A patient can have only ONE open task per reason. The database enforces
// this, so two requests at the same moment cannot create duplicates.
taskSchema.index({ patient: 1, reason: 1 }, { unique: true, partialFilterExpression: { status: 'open' } });
taskSchema.index({ navigator: 1, status: 1, createdAt: -1 });
const FollowupTask = mongoose.model('FollowupTask', taskSchema);

const SupportContact = mongoose.model('SupportContact', new Schema({
  kind:        { type: String, enum: ['counsellor', 'peer_group', 'hotline'], required: true },
  name:        { type: String, required: true },
  description: String,
  phone:       String,
}));

module.exports = {
  User, Navigator, Patient, TreatmentPlan, Appointment, Medication,
  MedicationLog, Checkin, ContactLog, FollowupTask, SupportContact,
};
