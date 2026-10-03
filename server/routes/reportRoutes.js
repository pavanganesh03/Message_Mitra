const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');
const Report = require('../models/Report');

router.post('/', protect, async (req, res) => {
  try {
    const report = await Report.create({ user: req.user._id, message: req.body.message });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, adminProtect, async (req, res) => {
  try {
    const reports = await Report.find({}).populate('user', 'name phone').sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', protect, adminProtect, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    report.status = req.body.status;
    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
