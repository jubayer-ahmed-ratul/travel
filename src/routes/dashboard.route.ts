import express from 'express';
import { dashboardControllers } from '../controller/dashboard.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/stats', authenticate, authorize('admin'), dashboardControllers.getStats);
router.get('/chart-data', authenticate, authorize('admin'), dashboardControllers.getChartData);

export const DashboardRoutes = router;
