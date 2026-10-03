// Mock local translations so no external API is needed
const translations = {
  en: {
    safe_bank: "This is a normal bank update. You do not need to worry.",
    safe_otp: "This is your secret OTP. Do not share it with anyone.",
    safe_delivery: "This is a delivery update. Your package is on the way.",
    safe_gov: "This is a government or official notification.",
    danger_fraud: "DANGER! Scammers are trying to steal your money or information.",
    danger_link: "Do NOT click the link. It might be a fake website designed to steal your details.",
    danger_otp: "NEVER share your OTP or PIN. Scammers use fake promises to trick you.",
    danger_kyc: "This is a fake KYC/Account block threat. Real banks don't send such links.",
    danger_lottery: "This is a fake lottery/prize scam. Do not reply or send money.",
    suggestion_ignore: "Ignore this message.",
    suggestion_block: "Block the sender.",
    suggestion_bank: "Contact your bank immediately using their official app or phone number.",
    suggestion_family: "Show this message to a trusted family member."
  },
  hi: {
    safe_bank: "यह एक सामान्य बैंक अपडेट है। आपको चिंता करने की आवश्यकता नहीं है।",
    safe_otp: "यह आपका गुप्त OTP है। इसे किसी के साथ साझा न करें।",
    safe_delivery: "यह एक डिलीवरी अपडेट है। आपका पैकेज रास्ते में है।",
    safe_gov: "यह एक सरकारी या आधिकारिक अधिसूचना है।",
    danger_fraud: "खतरा! जालसाज आपका पैसा या जानकारी चुराने की कोशिश कर रहे हैं।",
    danger_link: "लिंक पर क्लिक न करें। यह आपकी जानकारी चुराने के लिए बनाई गई एक फर्जी वेबसाइट हो सकती है।",
    danger_otp: "कभी भी अपना OTP या पिन साझा न करें। जालसाज आपको धोखा देने के लिए झूठे वादे करते हैं।",
    danger_kyc: "यह एक फर्जी KYC/खाता ब्लॉक धमकी है। असली बैंक ऐसे लिंक नहीं भेजते।",
    danger_lottery: "यह एक फर्जी लॉटरी/इनाम घोटाला है। जवाब न दें या पैसे न भेजें।",
    suggestion_ignore: "इस संदेश पर ध्यान न दें।",
    suggestion_block: "प्रेषक को ब्लॉक करें।",
    suggestion_bank: "अपने बैंक के आधिकारिक ऐप या फोन नंबर का उपयोग करके तुरंत उनसे संपर्क करें।",
    suggestion_family: "यह संदेश परिवार के किसी विश्वसनीय सदस्य को दिखाएं।"
  },
  te: {
    safe_bank: "ఇది సాధారణ బ్యాంక్ అప్‌డేట్. మీరు ఆందోళన చెందాల్సిన అవసరం లేదు.",
    safe_otp: "ఇది మీ రహస్య OTP. దీనిని ఎవరితోనూ పంచుకోవద్దు.",
    safe_delivery: "ఇది డెలివరీ అప్‌డేట్. మీ ప్యాకేజీ వస్తోంది.",
    safe_gov: "ఇది ప్రభుత్వ లేదా అధికారిక నోటిఫికేషన్.",
    danger_fraud: "ప్రమాదం! స్కామర్‌లు మీ డబ్బు లేదా సమాచారాన్ని దొంగిలించడానికి ప్రయత్నిస్తున్నారు.",
    danger_link: "లింక్‌ను క్లిక్ చేయవద్దు. ఇది మీ వివరాలను దొంగిలించడానికి రూపొందించిన నకిలీ వెబ్‌సైట్ కావచ్చు.",
    danger_otp: "మీ OTP లేదా PIN ను ఎప్పుడూ పంచుకోవద్దు. మిమ్మల్ని మోసగించడానికి స్కామర్‌లు నకిలీ వాగ్దానాలను ఉపయోగిస్తారు.",
    danger_kyc: "ఇది నకిలీ KYC/ఖాతా బ్లాక్ బెదిరింపు. నిజమైన బ్యాంకులు అలాంటి లింక్‌లను పంపవు.",
    danger_lottery: "ఇది నకిలీ లాటరీ/బహుమతి స్కామ్. ప్రత్యుత్తరం ఇవ్వవద్దు లేదా డబ్బు పంపవద్దు.",
    suggestion_ignore: "ఈ సందేశాన్ని విస్మరించండి.",
    suggestion_block: "పంపినవారిని బ్లాక్ చేయండి.",
    suggestion_bank: "వారి అధికారిక యాప్ లేదా ఫోన్ నంబర్‌ను ఉపయోగించి వెంటనే మీ బ్యాంకును సంప్రదించండి.",
    suggestion_family: "ఈ సందేశాన్ని నమ్మకమైన కుటుంబ సభ్యునికి చూపించండి."
  }
};

const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['en'][key] || key;
};

module.exports = { getTranslation };
