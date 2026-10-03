const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const FamilyContact = require('../models/FamilyContact');

router.post('/', protect, async (req, res) => {
  try {
    const contact = await FamilyContact.create({ user: req.user._id, name: req.body.name, phone: req.body.phone });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const contacts = await FamilyContact.find({ user: req.user._id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await FamilyContact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
