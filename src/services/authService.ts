import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { IUser } from '../models/User';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const SALT_ROUNDS = 10;

// Generate a JWT token for the user
export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Register a new admin
export const registerAdmin = async (userData: any) => {
  const { email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Admin already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create a new admin
  const newAdmin = new User({
    email,
    password: hashedPassword,
    role: 'admin',
  });

  await newAdmin.save();

  const token = generateToken(newAdmin);
  return { user: newAdmin, token };
};

// Login admin
export const loginAdmin = async (email: string, password: string) => {
  const user = await User.findOne({ email, role: 'admin' });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user);
  return { user, token };
};
