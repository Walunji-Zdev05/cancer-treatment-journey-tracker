const mongoose = require('mongoose');

module.exports = mongoose.model('MessageLog', new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  direction: { type: String, enum: ['in', 'out'], default: 'out' },
  body: String,
  status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
}, { timestamps: true }));