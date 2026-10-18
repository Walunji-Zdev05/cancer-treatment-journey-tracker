require('dotenv').config();
const { connect } = require('./db');
const { createApp } = require('./app');

const port = process.env.PORT || 3000;
connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    createApp().listen(port, '0.0.0.0', () => console.log(`Tikondane API running on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Could not start:', err.message);
    process.exit(1);
  });
