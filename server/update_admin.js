import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is missing');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB.');
    // Wipe existing admin users to prevent login conflicts
    await Admin.deleteMany({});
    console.log('Old credentials wiped.');

    // Create new admin user
    await Admin.create({ username: 'vyom', password: 'vyom@123' });
    console.log('SUCCESS: Admin credentials updated to vyom / vyom@123');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
