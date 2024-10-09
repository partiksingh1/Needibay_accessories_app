import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

interface JwtPayload {
  id: string;
  role: string;
}

// Middleware to verify JWT token
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
     res.status(401).json({ message: 'No token provided' });
     return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return
  }
};
export const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  // Example logic to check if the user is an admin
  if (req.user?.role !== 'admin') {
   res.status(403).json({ message: 'Access forbidden: Admins only' });
   return;
  }
  next(); // Call next to continue if user is an admin
};
