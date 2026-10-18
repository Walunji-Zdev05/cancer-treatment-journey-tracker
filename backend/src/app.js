const express = require('express');
const cors = require('cors');

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false })); // USSD gateways send form data

  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use('/auth', require('./routes/auth')());
  app.use('/patient', require('./routes/patient')());
  app.use('/navigator', require('./routes/navigator')());
  app.use('/ussd', require('./routes/ussd')());

  app.use((req, res) => res.status(404).json({ error: 'Not found.' }));
  // Express 5 sends errors from async routes here automatically.
  app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Something went wrong on our side.' });
  });
  return app;
}

module.exports = { createApp };
