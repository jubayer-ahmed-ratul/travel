import express from 'express';
import { eventControllers } from '../controller/event.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, authorize('admin'), eventControllers.createEvent);
router.get('/', authenticate, eventControllers.getEvents);

export const EventRoutes = router;
