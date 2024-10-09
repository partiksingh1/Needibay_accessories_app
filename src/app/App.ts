// src/config/app.ts

import express from 'express';
import dotenv from 'dotenv';
import appRoute from '../routes/authRoutes';
import connectDB from '../config/database';// Import the connectDB function

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', appRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
