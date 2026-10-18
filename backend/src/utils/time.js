// Malawi is UTC+2 all year (no daylight saving). Using one fixed timezone means
// "today" and "due at 14:00" mean the same thing no matter where the server runs.
const TZ = 'Africa/Blantyre';

// "2026-10-18"
const todayLocal = (d = new Date()) => d.toLocaleDateString('en-CA', { timeZone: TZ });

// "14:05" (24-hour)
const nowHHMM = (d = new Date()) =>
  d.toLocaleTimeString('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false });

// Whole calendar days from today to the given date, in Malawi time. Today = 0.
function daysAway(date, now = new Date()) {
  const a = Date.parse(todayLocal(now) + 'T00:00:00Z');
  const b = Date.parse(todayLocal(new Date(date)) + 'T00:00:00Z');
  return Math.round((b - a) / 86400000);
}

// A Date that is `days` from today at hh:mm Malawi time. Used by the seed data.
function atMalawiTime(days, hh = 8, mm = 30, now = new Date()) {
  const base = new Date(`${todayLocal(now)}T${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00+02:00`);
  return new Date(base.getTime() + days * 86400000);
}

module.exports = { TZ, todayLocal, nowHHMM, daysAway, atMalawiTime };
