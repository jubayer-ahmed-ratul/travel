import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Booking } from '../model/booking.model';
import { Item } from '../model/item.model';
import { User } from '../model/user.model';

const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const [totalUsers, totalItems, totalOrders, revenueData] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([{ $group: { _id: null, total: { $sum: '$price' } } }]),
    ]);
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalItems,
        totalOrders,
        totalRevenue: revenueData[0]?.total || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats', error: err.message });
  }
};

const getChartData = async (req: AuthRequest, res: Response) => {
  try {
    // Bookings per month (bar/line chart)
    const bookingsByMonth = await Booking.aggregate([
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 }, revenue: { $sum: '$price' } } },
      { $sort: { '_id': 1 } },
    ]);

    // Items by category (pie chart)
    const itemsByCategory = await Item.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: { bookingsByMonth, itemsByCategory },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch chart data', error: err.message });
  }
};

export const dashboardControllers = { getStats, getChartData };
