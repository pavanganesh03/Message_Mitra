const mongoose = require('mongoose');

const savedMessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
  note: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SavedMessage', savedMessageSchema);
