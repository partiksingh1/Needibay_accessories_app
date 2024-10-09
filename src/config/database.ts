// src/config/database.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || '';
    await mongoose.connect(uri); // Removed deprecated options
    console.log('MongoDB connected successfully');
  } catch (error: any) { // Explicitly typing the error
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
