require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { startJobs } = require('./jobs/daily.jobs');

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  startJobs();
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
})();