const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Confirmed Scam'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
