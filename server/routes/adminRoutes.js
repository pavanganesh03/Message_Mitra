const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Message = require('../models/Message');
const ScamPattern = require('../models/ScamPattern');
const Report = require('../models/Report');

// Admin Dashboard Stats
router.get('/stats', protect, adminProtect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMessages = await Message.countDocuments();
    const fraudMessages = await Message.countDocuments({ riskLevel: { $ne: 'Safe' } });
    
    const categoryBreakdown = await Message.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    
    res.json({ totalUsers, totalMessages, fraudMessages, categoryBreakdown });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Users management
router.get('/users', protect, adminProtect, async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});
router.put('/users/:id/block', protect, adminProtect, async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json(user);
});
router.delete('/users/:id', protect, adminProtect, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User removed' });
});

// Scam patterns management
router.get('/scam-patterns', protect, adminProtect, async (req, res) => {
  const patterns = await ScamPattern.find({});
  res.json(patterns);
});
router.post('/scam-patterns', protect, adminProtect, async (req, res) => {
  const pattern = await ScamPattern.create(req.body);
  res.status(201).json(pattern);
});
router.delete('/scam-patterns/:id', protect, adminProtect, async (req, res) => {
  await ScamPattern.findByIdAndDelete(req.params.id);
  res.json({ message: 'Pattern removed' });
});

// Messages view
router.get('/messages', protect, adminProtect, async (req, res) => {
  const messages = await Message.find({}).populate('user', 'name phone').sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;
