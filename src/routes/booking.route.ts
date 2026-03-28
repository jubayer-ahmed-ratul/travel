import express from 'express';
import { bookingControllers } from '../controller/booking.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, bookingControllers.createBooking);
router.get('/', authenticate, bookingControllers.getBookings);
router.patch('/:id', authenticate, bookingControllers.updateBooking);
router.delete('/:id', authenticate, bookingControllers.deleteBooking);

export const BookingRoutes = router;
