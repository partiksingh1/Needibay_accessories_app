import { Request, Response, NextFunction } from 'express';

// Middleware to check if the user is an admin
export const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
     res.status(403).json({ message: 'Access denied. Admins only.' });
     return
  }
  next();
};
