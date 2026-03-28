import express from 'express';
import { BookingRoutes } from './booking.route';
import { DashboardRoutes } from './dashboard.route';
import { ItemRoutes } from './item.route';
import { ReviewRoutes } from './review.route';
import { UserRoutes } from './user.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/items', route: ItemRoutes },
  { path: '/bookings', route: BookingRoutes },
  { path: '/reviews', route: ReviewRoutes },
  { path: '/dashboard', route: DashboardRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
