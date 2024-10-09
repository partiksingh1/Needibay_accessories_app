import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { adminCheck } from '../middleware/roleCheck';

const router = Router();

// Example admin-only route
router.get('/admin/dashboard', authenticate, adminCheck, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

export default router;
