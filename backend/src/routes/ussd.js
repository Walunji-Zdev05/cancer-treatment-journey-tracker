// PERSON 3 owns this file: USSD menu + reminder engine.
// Gateways (e.g. Africa's Talking) POST form data: sessionId, phoneNumber, text.
// Reply with plain text starting with "CON " (keep going) or "END " (finish).
const express = require('express');

module.exports = () => {
  const router = express.Router();
  router.post('/', (req, res) => {
    res.type('text/plain').send('END USSD menu not built yet (Person 3).');
  });
  return router;
};
