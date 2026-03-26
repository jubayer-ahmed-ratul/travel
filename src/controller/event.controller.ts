import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Event } from '../model/event.model';

// Admin: create event
const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { name, date, maxAttendees } = req.body;
    const event = await Event.create({ name, date, maxAttendees, createdBy: req.user?.email });
    res.status(201).json({ success: true, message: 'Event created', data: event });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to create event', error: err.message });
  }
};

// All: get all events
const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: err.message });
  }
};

export const eventControllers = { createEvent, getEvents };
