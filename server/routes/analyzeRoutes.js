const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Message = require('../models/Message');
const { classifyMessage } = require('../utils/classifier');
const { detectFraud } = require('../utils/fraudDetector');
const { generateExplanation } = require('../utils/explainer');

router.post('/', async (req, res) => {
  try {
    const { originalText, language } = req.body;
    // Check if user is logged in
    let userId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const jwt = require('jsonwebtoken');
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey_message_mitra_2026');
        userId = decoded.id;
      } catch(e) {}
    }

    const category = classifyMessage(originalText);
    const { riskLevel, reasons } = await detectFraud(originalText);
    const lang = language || 'en';
    const { explanation, actions } = generateExplanation(category, riskLevel, reasons, lang);

    let messageObj = {
      originalText,
      category,
      riskLevel,
      explanation
    };

    if (userId) {
      const newMsg = await Message.create({ ...messageObj, user: userId });
      messageObj._id = newMsg._id;
    }

    res.json({ ...messageObj, actions, reasons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
