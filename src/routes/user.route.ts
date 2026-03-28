import express from 'express';
import { userControllers } from '../controller/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/', authenticate, authorize('admin'), userControllers.getUsers);
router.get('/:id', authenticate, userControllers.getUserById);
router.patch('/role/:id', authenticate, authorize('admin'), userControllers.updateRole);
router.patch('/:id', authenticate, userControllers.updateUser);
router.delete('/:id', authenticate, authorize('admin'), userControllers.deleteUser);

export const UserRoutes = router;
