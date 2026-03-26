import { Schema, model } from 'mongoose';
import { IEvent } from '../types/event.interface';

const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  maxAttendees: { type: Number, required: true },
  bookedCount: { type: Number, default: 0 },
  createdBy: { type: String, required: true },
}, { timestamps: true });

export const Event = model<IEvent>('Event', eventSchema);
