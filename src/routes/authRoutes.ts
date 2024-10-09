import { Router } from 'express';
import { registerAdminController, loginAdminController } from '../controllers/authController';

const appRoute = Router();

// Admin Registration Route
appRoute.post('/admin/register', registerAdminController);

// Admin Login Route
appRoute.post('/admin/login', loginAdminController);

export default appRoute;
