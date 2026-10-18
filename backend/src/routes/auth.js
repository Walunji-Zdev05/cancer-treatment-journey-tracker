const express = require('express');
const bcrypt = require('bcryptjs');
const { User, Patient } = require('../models');
const { signToken } = require('../middleware/auth');

const cleanPhone = (p) => String(p || '').replace(/\s+/g, '');

module.exports = () => {
  const router = express.Router();

  // POST /auth/register  { phone, password, fullName, language? }
  // Registers a PATIENT. (Navigator accounts are created by an admin / seed.)
  router.post('/register', async (req, res) => {
    const { password, fullName, language = 'en' } = req.body || {};
    const phone = cleanPhone(req.body && req.body.phone);
    if (!phone || !password || !fullName) {
      return res.status(400).json({ error: 'phone, password and fullName are required.' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    if (!['en', 'ny'].includes(language)) {
      return res.status(400).json({ error: "language must be 'en' or 'ny'." });
    }

    let user;
    try {
      user = await User.create({
        role: 'patient', phone, fullName, language,
        passwordHash: bcrypt.hashSync(String(password), 10),
      });
    } catch (err) {
      if (err.code === 11000) return res.status(409).json({ error: 'This phone number is already registered.' });
      throw err;
    }
    try {
      await Patient.create({ user: user._id });
    } catch (err) {
      await User.deleteOne({ _id: user._id }); // don't leave a half-created account
      throw err;
    }
    res.status(201).json({
      token: signToken({ id: user._id, role: 'patient' }),
      user: { id: String(user._id), role: 'patient', fullName: user.fullName, language: user.language },
    });
  });

  // POST /auth/login  { phone, password }
  router.post('/login', async (req, res) => {
    const user = await User.findOne({ phone: cleanPhone(req.body && req.body.phone) });
    const ok = user && bcrypt.compareSync(String((req.body && req.body.password) || ''), user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Wrong phone number or password.' });
    res.json({
      token: signToken({ id: user._id, role: user.role }),
      user: { id: String(user._id), role: user.role, fullName: user.fullName, language: user.language },
    });
  });

  return router;
};
