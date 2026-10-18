// ============================================================================
// SHARED BUSINESS RULES. Persons 1, 2 and 3 all call these functions so the
// "missed appointment" and "severe symptom" rules live in exactly ONE place.
// All functions are async: remember to `await` them.
// ============================================================================
const { Patient, Appointment, ContactLog, FollowupTask } = require('../models');

// Adds a task to the navigator's queue. If the patient already has an OPEN task
// for the same reason, nothing new is created (the database enforces this).
async function createTask({ patientId, reason, priority = 'normal', note = null }) {
  const patient = await Patient.findById(patientId).select('navigator');
  try {
    const task = await FollowupTask.create({
      patient: patientId,
      navigator: patient ? patient.navigator : undefined,
      reason, priority, note,
    });
    return { id: task._id, created: true };
  } catch (err) {
    if (err.code === 11000) {
      const existing = await FollowupTask.findOne({ patient: patientId, reason, status: 'open' });
      return { id: existing ? existing._id : null, created: false };
    }
    throw err;
  }
}

// Call this when an appointment is missed (navigator marks it, or Person 3's
// reminder job does it after the re-reminder goes unanswered).
//   1st miss  -> patient flagged "missed_1" + normal task
//   2nd+ miss -> patient flagged "missed_2_plus" + HIGH priority task
async function markAppointmentMissed(appointmentId) {
  const appt = await Appointment.findById(appointmentId);
  if (!appt) throw new Error('Appointment not found');

  const alreadyMissed = appt.status === 'missed';
  if (!alreadyMissed) {
    appt.status = 'missed';
    await appt.save();
  }

  const missedCount = await Appointment.countDocuments({ patient: appt.patient, status: 'missed' });
  const patientStatus = missedCount >= 2 ? 'missed_2_plus' : 'missed_1';
  await Patient.updateOne({ _id: appt.patient }, { status: patientStatus });

  const task = await createTask({
    patientId: appt.patient,
    reason: missedCount >= 2 ? 'missed_2_plus' : 'missed_appointment',
    priority: missedCount >= 2 ? 'high' : 'normal',
    note: `Missed: ${appt.title} (${appt.scheduledAt.toISOString()})`,
  });

  if (!alreadyMissed) {
    await ContactLog.create({
      patient: appt.patient,
      channel: 'system',
      outcome: 'flagged',
      notes: `Missed appointment #${missedCount}: ${appt.title}`,
    });
  }
  return { missedCount, patientStatus, taskCreated: task.created };
}

// Call this after saving a check-in that is marked severe.
function flagSevereCheckin(patientId, checkinId) {
  return createTask({
    patientId,
    reason: 'severe_symptom',
    priority: 'high',
    note: `Severe symptom reported in check-in ${checkinId}. Phone patient within 2 hours.`,
  });
}

// Is this check-in serious enough to alert the nurse?
// Thresholds come from the triage screen: nausea 4-5, pain 8-10, or any fever.
function isSevere({ nausea, pain, fever }) {
  return (nausea != null && nausea >= 4) || (pain != null && pain >= 8) || fever === true;
}

module.exports = { createTask, markAppointmentMissed, flagSevereCheckin, isSevere };
