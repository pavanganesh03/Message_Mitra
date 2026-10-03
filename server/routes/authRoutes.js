const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretjwtkey_message_mitra_2026', { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
  try {
    const { name, phone, password, preferredLanguage } = req.body;
    const userExists = await User.findOne({ phone });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, phone, password, preferredLanguage });
    if (user) {
      res.status(201).json({ _id: user._id, name: user.name, phone: user.phone, role: user.role, preferredLanguage: user.preferredLanguage, token: generateToken(user._id) });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (user && (await user.matchPassword(password))) {
      if (user.isBlocked) return res.status(403).json({ message: 'User is blocked' });
      res.json({ _id: user._id, name: user.name, phone: user.phone, role: user.role, preferredLanguage: user.preferredLanguage, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid phone or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
