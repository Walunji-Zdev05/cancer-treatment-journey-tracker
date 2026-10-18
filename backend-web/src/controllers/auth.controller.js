const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });

exports.register = async (req, res) => {
  const { name, email, password, role, facility } = req.body;
  const user = await User.create({ name, email, password, role, facility });
  res.status(201).json({ id: user._id, name: user.name, role: user.role });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({
    token: sign(user._id),
    user: { id: user._id, name: user.name, role: user.role, facility: user.facility },
  });
};