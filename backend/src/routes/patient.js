// ============================================================================
// PATIENT MOBILE API  (Person 1)
// Every route needs a logged-in patient. Each one feeds a screen in mobile/.
// ============================================================================
const express = require('express');
const mongoose = require('mongoose');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  Patient, Navigator, TreatmentPlan, Appointment, Medication, MedicationLog, Checkin, SupportContact,
} = require('../models');
const { flagSevereCheckin, isSevere, createTask } = require('../services/followup');
const { todayLocal, nowHHMM, daysAway } = require('../utils/time');

const COMFORT_MESSAGES = [
  { english: 'You are not walking this path alone. You are doing well.', chichewa: 'Simuli nokha pa ulendo umenewu. Mukuyesetsa kwambiri.' },
  { english: 'Every small step today is a step toward healing.', chichewa: 'Sitepe iliyonse yaying’ono lero ikuyandikitsani ku machiritso.' },
  { english: 'Rest is part of your treatment. Be gentle with yourself.', chichewa: 'Kupumula ndi gawo la chithandizo chanu. Dzichitireni chifundo.' },
];

const percentDone = (plan) => Math.round(((plan.currentCycle - 1) / plan.totalCycles) * 100);

module.exports = () => {
  const router = express.Router();
  router.use(requireAuth, requireRole('patient'));

  // Attach the patient (with their name/language) to every request.
  router.use(async (req, res, next) => {
    req.patient = await Patient.findOne({ user: req.user.id }).populate('user', 'fullName language');
    if (!req.patient) return res.status(404).json({ error: 'Patient profile not found.' });
    next();
  });

  // Medicines for today with a status the UI can show: taken | due | upcoming
  async function medicinesToday(patientId) {
    const [meds, logs] = await Promise.all([
      Medication.find({ patient: patientId, active: true }).sort('scheduledTime'),
      MedicationLog.find({ patient: patientId, logDate: todayLocal() }),
    ]);
    const taken = new Map(logs.map((l) => [String(l.medication), l.takenAt]));
    const now = nowHHMM();
    return meds.map((m) => {
      const takenAt = taken.get(String(m._id)) || null;
      return {
        id: String(m._id),
        name: m.name,
        purpose: m.purpose,
        instructions: m.instructions,
        scheduledTime: m.scheduledTime,
        takenAt,
        status: takenAt ? 'taken' : m.scheduledTime <= now ? 'due' : 'upcoming',
      };
    });
  }

  // GET /patient/home  -> HomeScreen
  router.get('/home', async (req, res) => {
    const p = req.patient;
    const [next, plan, meds] = await Promise.all([
      Appointment.findOne({
        patient: p._id, status: { $in: ['scheduled', 'confirmed'] }, scheduledAt: { $gte: new Date() },
      }).sort('scheduledAt'),
      TreatmentPlan.findOne({ patient: p._id }).sort('-createdAt'),
      medicinesToday(p._id),
    ]);

    let navigator = null;
    if (p.navigator) {
      const nav = await Navigator.findById(p.navigator).populate('user', 'fullName phone');
      if (nav) navigator = { name: nav.user.fullName, title: nav.title, hospital: nav.hospital, phone: nav.user.phone };
    }

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    res.json({
      patient: { name: p.user.fullName, language: p.user.language, status: p.status },
      comfortMessage: COMFORT_MESSAGES[dayOfYear % COMFORT_MESSAGES.length],
      nextVisit: next && {
        id: String(next._id),
        title: next.title,
        detail: next.detail,
        location: next.location,
        scheduledAt: next.scheduledAt,
        status: next.status,
        daysAway: daysAway(next.scheduledAt),
        treatment: plan && {
          name: `Cycle ${plan.currentCycle} of ${plan.totalCycles}`,
          progressPercent: percentDone(plan),
        },
      },
      medicines: { items: meds, takenCount: meds.filter((m) => m.status === 'taken').length, total: meds.length },
      navigator,
    });
  });

  // GET /patient/care-path  -> CarePathScreen timeline
  router.get('/care-path', async (req, res) => {
    const p = req.patient;
    const [plan, appts] = await Promise.all([
      TreatmentPlan.findOne({ patient: p._id }).sort('-createdAt'),
      Appointment.find({ patient: p._id }).sort('scheduledAt'),
    ]);

    let nextAssigned = false;
    const steps = appts.map((a) => {
      let state = 'upcoming';
      if (a.status === 'attended') state = 'completed';
      else if (a.status === 'missed') state = 'missed';
      else if (!nextAssigned) { state = 'next'; nextAssigned = true; }
      return {
        id: String(a._id), state, kind: a.kind, title: a.title, detail: a.detail,
        location: a.location, scheduledAt: a.scheduledAt, status: a.status,
      };
    });

    res.json({
      plan: plan && {
        protocolName: plan.protocolName, planName: plan.planName, detail: plan.detail,
        currentCycle: plan.currentCycle, totalCycles: plan.totalCycles, percentComplete: percentDone(plan),
      },
      steps,
    });
  });

  // Finds an appointment and makes sure it belongs to THIS patient.
  async function ownAppointment(req, res) {
    const id = req.params.id;
    const appt = mongoose.isValidObjectId(id) ? await Appointment.findOne({ _id: id, patient: req.patient._id }) : null;
    if (!appt) res.status(404).json({ error: 'Appointment not found.' });
    return appt;
  }

  // POST /patient/appointments/:id/confirm  -> "Ndzabwera • Confirm I Will Come"
  router.post('/appointments/:id/confirm', async (req, res) => {
    const appt = await ownAppointment(req, res);
    if (!appt) return;
    if (appt.status === 'attended' || appt.status === 'missed') {
      return res.status(409).json({ error: 'This appointment has already passed.' });
    }
    appt.status = 'confirmed';
    appt.confirmedAt = new Date();
    await appt.save();
    res.json({ id: String(appt._id), status: 'confirmed' });
  });

  // POST /patient/appointments/:id/reschedule-request  { reason? }
  router.post('/appointments/:id/reschedule-request', async (req, res) => {
    const appt = await ownAppointment(req, res);
    if (!appt) return;
    appt.rescheduleRequested = true;
    await appt.save();
    await createTask({
      patientId: req.patient._id,
      reason: 'reschedule_request',
      note: (req.body && req.body.reason) || `Patient asked to reschedule: ${appt.title}`,
    });
    res.json({ id: String(appt._id), rescheduleRequested: true });
  });

  // POST /patient/callback-request  -> "Request a callback" on the missed-appointment screen
  router.post('/callback-request', async (req, res) => {
    const task = await createTask({
      patientId: req.patient._id,
      reason: 'callback_request',
      priority: 'high',
      note: (req.body && req.body.note) || 'Patient asked for a callback.',
    });
    res.status(task.created ? 201 : 200).json({ requested: true });
  });

  // GET /patient/medications  -> MedicinesScreen
  router.get('/medications', async (req, res) => res.json({ items: await medicinesToday(req.patient._id) }));

  // POST /patient/medications/:id/taken  (send { taken: false } to undo)
  router.post('/medications/:id/taken', async (req, res) => {
    const id = req.params.id;
    const med = mongoose.isValidObjectId(id) ? await Medication.findOne({ _id: id, patient: req.patient._id }) : null;
    if (!med) return res.status(404).json({ error: 'Medicine not found.' });

    if (req.body && req.body.taken === false) {
      await MedicationLog.deleteOne({ medication: med._id, logDate: todayLocal() });
    } else {
      // upsert: tapping twice never creates a second record for the same day
      try {
        await MedicationLog.updateOne(
          { medication: med._id, logDate: todayLocal() },
          { $setOnInsert: { patient: req.patient._id, takenAt: new Date() } },
          { upsert: true }
        );
      } catch (err) {
        if (err.code !== 11000) throw err; // two taps at once: already logged, that's fine
      }
    }
    res.json({ items: await medicinesToday(req.patient._id) });
  });

  // POST /patient/checkin  -> TriageScreen AND the quick mood buttons on Home
  //   { mood?, nausea? (1-5), pain? (0-10), energy? (good|moderate|bed), fever? (true|false) }
  router.post('/checkin', async (req, res) => {
    const { mood, nausea, pain, energy, fever } = req.body || {};
    const errors = [];
    if (mood != null && !['great', 'okay', 'tired', 'pain'].includes(mood)) errors.push('mood is invalid');
    if (nausea != null && !(Number.isInteger(nausea) && nausea >= 1 && nausea <= 5)) errors.push('nausea must be 1-5');
    if (pain != null && !(Number.isInteger(pain) && pain >= 0 && pain <= 10)) errors.push('pain must be 0-10');
    if (energy != null && !['good', 'moderate', 'bed'].includes(energy)) errors.push('energy is invalid');
    if (fever != null && typeof fever !== 'boolean') errors.push('fever must be true or false');
    if ([mood, nausea, pain, energy, fever].every((v) => v == null)) errors.push('send at least one answer');
    if (errors.length) return res.status(400).json({ error: errors.join('; ') });

    const severe = isSevere({ nausea, pain, fever });
    const checkin = await Checkin.create({ patient: req.patient._id, mood, nausea, pain, energy, fever, severe });
    if (severe) await flagSevereCheckin(req.patient._id, checkin._id);

    res.status(201).json({
      id: String(checkin._id),
      severe,
      message: severe
        ? 'Your nurse has been alerted and will phone you within 2 hours.'
        : 'Thank you. Your care team has received your update.',
    });
  });

  // GET /patient/support  -> counselling / peer support screen
  router.get('/support', async (req, res) => {
    const items = await SupportContact.find().sort('kind name');
    res.json({
      items: items.map((s) => ({ id: String(s._id), kind: s.kind, name: s.name, description: s.description, phone: s.phone })),
    });
  });

  return router;
};
