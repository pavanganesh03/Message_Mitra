const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // null for guests
  originalText: { type: String, required: true },
  category: { type: String, required: true },
  riskLevel: { type: String, enum: ['Safe', 'Be Careful', 'Danger'], required: true },
  explanation: { type: String }, // optional, can be generated on fly
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
