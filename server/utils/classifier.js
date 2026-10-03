const classifyMessage = (text) => {
  const lowerText = text.toLowerCase();
  if (lowerText.match(/bank|account|debited|credited|balance/i)) return 'Bank';
  if (lowerText.match(/otp|code/i)) return 'OTP';
  if (lowerText.match(/delivery|courier|order/i)) return 'Delivery';
  if (lowerText.match(/recharge|plan|validity/i)) return 'Recharge';
  if (lowerText.match(/gov|aadhaar|pan/i)) return 'Government';
  if (lowerText.match(/appointment|doctor|hospital/i)) return 'Appointment';
  return 'Unknown';
};

module.exports = { classifyMessage };
