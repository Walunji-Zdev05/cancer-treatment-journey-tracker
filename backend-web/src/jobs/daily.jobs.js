const cron = require('node-cron');
const Appointment = require('../models/Appointment');
const { sendSms } = require('../services/sms.service');

async function markMissed() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  await Appointment.updateMany(
    { status: 'scheduled', scheduledDate: { $lt: startOfToday } },
    { status: 'missed' }
  );
}

async function sendReminders() {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  const appts = await Appointment.find({
    status: 'scheduled', scheduledDate: { $gte: start, $lte: end }, reminderSentAt: null,
  }).populate('patient');

  for (const a of appts) {
    await sendSms(a.patient, `Reminder: your ${a.type} visit is tomorrow. Please come on time. We are with you.`);
    a.reminderSentAt = new Date();
    await a.save();
  }
}

exports.startJobs = () => {
  cron.schedule('0 6 * * *', async () => {
    try {
      await markMissed();
      await sendReminders();
    } catch (err) {
      console.error('Daily job failed:', err);
    }
  }, { timezone: 'Africa/Blantyre' });
};