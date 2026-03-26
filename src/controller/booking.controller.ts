import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Booking } from '../model/booking.model';
import { Event } from '../model/event.model';

// User: book an event
const bookEvent = async (req: AuthRequest, res: Response) => {
  try {
    const eventId = req.params.eventId as string;
    const userEmail = req.user?.email;

    // Check event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check availability
    if (event.bookedCount >= event.maxAttendees) {
      return res.status(400).json({ success: false, message: 'Event is fully booked' });
    }

    // Check duplicate booking
    const alreadyBooked = await Booking.findOne({ event: eventId, user: userEmail });
    if (alreadyBooked) {
      return res.status(400).json({ success: false, message: 'You have already booked this event' });
    }

    await Booking.create({ event: eventId, user: userEmail });
    await Event.findByIdAndUpdate(eventId, { $inc: { bookedCount: 1 } } as any);

    res.status(201).json({ success: true, message: 'Event booked successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to book event', error: err.message });
  }
};

// User: get my bookings
const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user?.email });
    res.status(200).json({ success: true, data: bookings });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: err.message });
  }
};

export const bookingControllers = { bookEvent, getMyBookings };
