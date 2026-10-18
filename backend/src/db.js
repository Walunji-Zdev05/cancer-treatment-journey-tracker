const mongoose = require('mongoose');
require('./models'); // registers every model

// Connects to MongoDB Atlas. The connection string lives in .env (never commit it).
async function connect({ uri = process.env.MONGODB_URI, dbName = process.env.DB_NAME || 'tikondane' } = {}) {
  if (!uri) throw new Error('MONGODB_URI is not set. Copy .env.example to .env and paste your Atlas connection string.');
  await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 10000 });
  // Build indexes now (unique phone, one-open-task-per-reason, etc.)
  await Promise.all(Object.values(mongoose.models).map((m) => m.init()));
  return mongoose.connection;
}

const disconnect = () => mongoose.disconnect();

module.exports = { connect, disconnect };
