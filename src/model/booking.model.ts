import { Schema, model } from 'mongoose';
import { IBooking } from '../types/booking.interface';

const bookingSchema = new Schema<IBooking>({
  event: { type: String, required: true },
  user: { type: String, required: true },
}, { timestamps: true });

// Prevent duplicate bookings
bookingSchema.index({ event: 1, user: 1 }, { unique: true });

export const Booking = model<IBooking>('Booking', bookingSchema);
