const { getTranslation } = require('./translations');

const generateExplanation = (category, riskLevel, reasons, lang) => {
  let explanation = '';
  let actions = [];

  if (riskLevel === 'Safe') {
    if (category === 'Bank') explanation = getTranslation(lang, 'safe_bank');
    else if (category === 'OTP') explanation = getTranslation(lang, 'safe_otp');
    else if (category === 'Delivery') explanation = getTranslation(lang, 'safe_delivery');
    else if (category === 'Government') explanation = getTranslation(lang, 'safe_gov');
    else explanation = "This message seems normal and safe.";
    actions.push(getTranslation(lang, 'suggestion_ignore'));
  } else {
    // Risky
    const explainParts = reasons.map(r => getTranslation(lang, r));
    explanation = explainParts.join(' ');
    
    if (reasons.includes('danger_link') || reasons.includes('danger_kyc')) {
      actions.push(getTranslation(lang, 'suggestion_bank'));
    }
    actions.push(getTranslation(lang, 'suggestion_family'));
    actions.push(getTranslation(lang, 'suggestion_block'));
  }

  return { explanation, actions };
};

module.exports = { generateExplanation };
