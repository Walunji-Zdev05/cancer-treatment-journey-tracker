require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = 'admin@example.com';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists');
  } else {
    await User.create({
      name: 'System Admin',
      email,
      password: 'ChangeMe123!',
      role: 'admin',
      facility: 'Kamuzu Central Hospital',
    });
    console.log('Admin created:', email);
  }

  await mongoose.disconnect();
})();