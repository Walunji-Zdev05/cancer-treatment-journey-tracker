// Integration tests. They run against a SEPARATE database called "tikondane_test"
// on your Atlas cluster (using MONGODB_URI from .env) and wipe it before and after.
require('dotenv').config();
const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

const SKIP = process.env.MONGODB_URI ? false : 'MONGODB_URI is not set (see .env.example)';
const { connect, disconnect } = require('../src/db');
const { createApp } = require('../src/app');
const { seed } = require('../src/seed');
const { Appointment, FollowupTask, Patient } = require('../src/models');
const { markAppointmentMissed } = require('../src/services/followup');

let server, base, token;

test.before(async () => {
  if (SKIP) return;
  await connect({ dbName: 'tikondane_test' });
  // Safety: never wipe anything except the test database.
  assert.equal(mongoose.connection.name, 'tikondane_test');
  await mongoose.connection.dropDatabase();
  await Promise.all(Object.values(mongoose.models).map((m) => m.init()));
  await seed();

  server = createApp().listen(0);
  base = `http://localhost:${server.address().port}`;
  const r = await fetch(`${base}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '+265999000001', password: 'password123' }),
  });
  token = (await r.json()).token;
});

test.after(async () => {
  if (SKIP) return;
  server.close();
  assert.equal(mongoose.connection.name, 'tikondane_test');
  await mongoose.connection.dropDatabase();
  await disconnect();
});

const api = (path, opts = {}) =>
  fetch(base + path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: opts.body && JSON.stringify(opts.body),
  });

test('rejects requests without a token', { skip: SKIP }, async () => {
  assert.equal((await fetch(`${base}/patient/home`)).status, 401);
});

test('wrong password is rejected', { skip: SKIP }, async () => {
  const r = await fetch(`${base}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '+265999000001', password: 'nope' }),
  });
  assert.equal(r.status, 401);
});

test('home returns next visit, medicines and navigator', { skip: SKIP }, async () => {
  const h = await (await api('/patient/home')).json();
  assert.equal(h.patient.name, 'Alineti B.');
  assert.equal(h.nextVisit.title, 'Cycle 3 Chemotherapy & Navigator Review');
  assert.equal(h.nextVisit.daysAway, 3);
  assert.equal(h.medicines.total, 3);
  assert.equal(h.medicines.takenCount, 1);
  assert.equal(h.navigator.name, 'Nurse Grace Phiri');
});

test('care-path marks one step as next', { skip: SKIP }, async () => {
  const c = await (await api('/patient/care-path')).json();
  assert.equal(c.steps.filter((s) => s.state === 'next').length, 1);
  assert.equal(c.steps.filter((s) => s.state === 'completed').length, 2);
});

test('confirm appointment', { skip: SKIP }, async () => {
  const h = await (await api('/patient/home')).json();
  const r = await api(`/patient/appointments/${h.nextVisit.id}/confirm`, { method: 'POST' });
  assert.equal((await r.json()).status, 'confirmed');
});

test('mark medicine taken (twice is safe) then undo', { skip: SKIP }, async () => {
  const meds = (await (await api('/patient/medications')).json()).items;
  const para = meds.find((m) => m.name.startsWith('Paracetamol'));
  await api(`/patient/medications/${para.id}/taken`, { method: 'POST', body: {} });
  let r = await (await api(`/patient/medications/${para.id}/taken`, { method: 'POST', body: {} })).json();
  assert.equal(r.items.find((m) => m.id === para.id).status, 'taken');
  r = await (await api(`/patient/medications/${para.id}/taken`, { method: 'POST', body: { taken: false } })).json();
  assert.notEqual(r.items.find((m) => m.id === para.id).status, 'taken');
});

test('mild check-in does not alert the nurse', { skip: SKIP }, async () => {
  const r = await api('/patient/checkin', { method: 'POST', body: { nausea: 2, pain: 2, energy: 'good', fever: false } });
  assert.equal(r.status, 201);
  assert.equal((await r.json()).severe, false);
});

test('severe check-in creates ONE high-priority task, even if sent twice', { skip: SKIP }, async () => {
  const body = { nausea: 5, fever: true };
  assert.equal((await (await api('/patient/checkin', { method: 'POST', body })).json()).severe, true);
  await api('/patient/checkin', { method: 'POST', body });
  const tasks = await FollowupTask.find({ reason: 'severe_symptom' });
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].priority, 'high');
});

test('invalid check-in is rejected', { skip: SKIP }, async () => {
  assert.equal((await api('/patient/checkin', { method: 'POST', body: { nausea: 9 } })).status, 400);
});

test('missed appointments flag the patient and escalate on the 2nd', { skip: SKIP }, async () => {
  const appts = await Appointment.find({ status: { $in: ['scheduled', 'confirmed'] } }).sort('scheduledAt');
  const first = await markAppointmentMissed(appts[0]._id);
  assert.equal(first.patientStatus, 'missed_1');
  const second = await markAppointmentMissed(appts[1]._id);
  assert.equal(second.patientStatus, 'missed_2_plus');
  const task = await FollowupTask.findOne({ reason: 'missed_2_plus' });
  assert.equal(task.priority, 'high');
  assert.equal((await Patient.findOne()).status, 'missed_2_plus');
});

test('bad or unknown ids return 404, not a crash', { skip: SKIP }, async () => {
  assert.equal((await api('/patient/appointments/not-an-id/confirm', { method: 'POST' })).status, 404);
  assert.equal((await api('/patient/appointments/64b7f0c2a1b2c3d4e5f6a7b8/confirm', { method: 'POST' })).status, 404);
});

test('registering works and a duplicate phone is blocked', { skip: SKIP }, async () => {
  const body = { phone: '+265888000000', password: 'secret1', fullName: 'Test Patient' };
  const post = () => fetch(`${base}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  assert.equal((await post()).status, 201);
  assert.equal((await post()).status, 409);
});
