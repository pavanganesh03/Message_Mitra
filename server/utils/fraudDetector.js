const ScamPattern = require('../models/ScamPattern');

const detectFraud = async (messageText) => {
  const text = messageText.toLowerCase();
  const reasons = [];
  let riskLevel = 'Safe';
  let category = 'Unknown';

  // Static rules
  if (text.match(/(http|https):\/\/[^\s]+/)) {
    reasons.push('danger_link');
    riskLevel = 'Be Careful';
  }
  
  if (text.match(/otp|pin|cvv|password/i)) {
    if (text.match(/share|tell|forward/i)) {
      reasons.push('danger_otp');
      riskLevel = 'Danger';
    }
  }

  // Dynamic patterns from DB
  try {
    const patterns = await ScamPattern.find({});
    patterns.forEach(p => {
      const regex = new RegExp(p.keyword, 'i');
      if (regex.test(text)) {
        if (p.riskLevel === 'Danger') riskLevel = 'Danger';
        if (riskLevel !== 'Danger' && p.riskLevel === 'Be Careful') riskLevel = 'Be Careful';
        if (p.keyword.includes('kyc') || p.keyword.includes('block')) {
          reasons.push('danger_kyc');
        } else if (p.keyword.includes('lottery') || p.keyword.includes('prize')) {
          reasons.push('danger_lottery');
        } else {
          reasons.push('danger_fraud');
        }
      }
    });
  } catch (error) {
    console.error("Error fetching scam patterns:", error);
  }

  return { riskLevel, reasons: [...new Set(reasons)] };
};

module.exports = { detectFraud };
