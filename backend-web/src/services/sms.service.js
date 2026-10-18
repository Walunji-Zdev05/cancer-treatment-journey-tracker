const AfricasTalking = require('africastalking');
const MessageLog = require('../models/MessageLog');

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

exports.sendSms = async (patient, body) => {
  if (!patient || !patient.consentSms) return; // never message without consent
  try {
    await at.SMS.send({
      to: [patient.phone],
      message: body,
      from: process.env.AT_SENDER_ID || undefined,
    });
    await MessageLog.create({ patient: patient._id, body, status: 'sent' });
  } catch (err) {
    console.error('SMS failed:', err.message);
    await MessageLog.create({ patient: patient._id, body, status: 'failed' });
  }
};