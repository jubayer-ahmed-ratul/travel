import express from 'express';
import { BookingRoutes } from './booking.route';
import { EventRoutes } from './event.route';
import { UserRoutes } from './user.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/events', route: EventRoutes },
  { path: '/bookings', route: BookingRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;