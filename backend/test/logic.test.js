const test = require('node:test');
const assert = require('node:assert/strict');
const { isSevere } = require('../src/services/followup');
const { todayLocal, nowHHMM, daysAway, atMalawiTime } = require('../src/utils/time');

test('isSevere uses the triage thresholds', () => {
  assert.equal(isSevere({ nausea: 3, pain: 7, fever: false }), false);
  assert.equal(isSevere({ nausea: 4 }), true);
  assert.equal(isSevere({ pain: 8 }), true);
  assert.equal(isSevere({ fever: true }), true);
  assert.equal(isSevere({}), false);
});

test('Malawi time helpers', () => {
  const now = new Date('2026-10-18T23:30:00Z'); // already 01:30 on the 19th in Malawi
  assert.equal(todayLocal(now), '2026-10-19');
  assert.equal(nowHHMM(now), '01:30');
  assert.equal(daysAway(atMalawiTime(3, 8, 30, now), now), 3);
  assert.equal(daysAway(atMalawiTime(0, 8, 30, now), now), 0);
  assert.equal(daysAway(atMalawiTime(-2, 8, 30, now), now), -2);
});

test('app builds and every model loads', () => {
  const { createApp } = require('../src/app');
  assert.equal(typeof createApp(), 'function');
  assert.equal(Object.keys(require('../src/models')).length, 11);
});
