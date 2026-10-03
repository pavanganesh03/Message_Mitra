const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const SavedMessage = require('../models/SavedMessage');

router.post('/:messageId', protect, async (req, res) => {
  try {
    const saved = await SavedMessage.create({ user: req.user._id, message: req.params.messageId, note: req.body.note });
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const saved = await SavedMessage.find({ user: req.user._id }).populate('message').sort({ createdAt: -1 });
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await SavedMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
