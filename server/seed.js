const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const ScamPattern = require('./models/ScamPattern');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await ScamPattern.deleteMany();

    // Default admin
    await User.create({
      name: 'Admin User',
      phone: '0000000000',
      password: 'Admin@123',
      role: 'admin'
    });

    // Default patterns
    await ScamPattern.create([
      { keyword: 'electricity.*disconnect', riskLevel: 'Danger', description: 'Fake electricity board scam', category: 'Fraud' },
      { keyword: 'kyc.*update', riskLevel: 'Danger', description: 'Fake KYC update link', category: 'Fraud' },
      { keyword: 'claim.*prize', riskLevel: 'Danger', description: 'Fake lottery or prize', category: 'Fraud' },
      { keyword: 'account.*blocked', riskLevel: 'Danger', description: 'Fake account blocked threat', category: 'Fraud' }
    ]);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
