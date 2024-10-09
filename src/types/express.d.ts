// src/types/express.d.ts

import { IUser } from '../models/User'; // Adjust the path if necessary

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}
