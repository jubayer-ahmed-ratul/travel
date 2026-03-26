import express from 'express';
import { userControllers } from '../controller/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/', authenticate, authorize('admin'), userControllers.getUsers);

export const UserRoutes = router;