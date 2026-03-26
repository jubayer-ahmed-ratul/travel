import express from 'express';
import { bookingControllers } from '../controller/booking.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/:eventId', authenticate, authorize('user', 'staff'), bookingControllers.bookEvent);
router.get('/my', authenticate, bookingControllers.getMyBookings);

export const BookingRoutes = router;
