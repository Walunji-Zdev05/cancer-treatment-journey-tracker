// PERSON 2 owns this file: Navigator Dashboard API.
// Planned: GET /navigator/patients, GET /navigator/patients/:id, GET /navigator/tasks,
//          POST /navigator/patients/:id/contact-log, POST /navigator/appointments/:id/missed
// Models are in src/models.js. Tip: call markAppointmentMissed() from
// services/followup.js (await it). Don't rewrite the rule.
const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');

module.exports = () => {
  const router = express.Router();
  router.use(requireAuth, requireRole('navigator', 'admin'));
  router.get('/', (req, res) => res.status(501).json({ error: 'Navigator API not built yet (Person 2).' }));
  return router;
};
