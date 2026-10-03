const mongoose = require('mongoose');

const scamPatternSchema = new mongoose.Schema({
  keyword: { type: String, required: true, unique: true },
  riskLevel: { type: String, enum: ['Be Careful', 'Danger'], required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'Fraud' }
}, { timestamps: true });

module.exports = mongoose.model('ScamPattern', scamPatternSchema);
