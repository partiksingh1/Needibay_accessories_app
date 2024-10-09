import { Request, Response } from 'express';
import { registerAdmin, loginAdmin } from '../services/authService';

// Register an admin
export const registerAdminController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await registerAdmin(req.body);
    res.status(201).json({ user, token });
  } catch (error: unknown) { // Specify the type of error
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred.' });
    }
  }
};

// Login as admin
export const loginAdminController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginAdmin(email, password);
    res.json({ user, token });
  } catch (error: unknown) { // Specify the type of error
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred.' });
    }
  }
};
