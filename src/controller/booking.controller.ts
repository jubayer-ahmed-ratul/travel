import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Booking } from '../model/booking.model';

const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.user?.id });
    res.status(201).json({ success: true, message: 'Booking created', data: booking });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to create booking', error: err.message });
  }
};

const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const filter = req.user?.role === 'admin' ? {} : { userId: req.user?.id };
    const bookings = await Booking.find(filter).populate('itemId', 'title price');
    res.status(200).json({ success: true, data: bookings });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: err.message });
  }
};

const updateBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.status(200).json({ success: true, message: 'Booking updated', data: booking });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to update booking', error: err.message });
  }
};

const deleteBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.status(200).json({ success: true, message: 'Booking deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to delete booking', error: err.message });
  }
};

export const bookingControllers = { createBooking, getBookings, updateBooking, deleteBooking };
