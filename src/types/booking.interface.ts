import { Types } from 'mongoose';

export interface IBooking {
  userId: Types.ObjectId;
  itemId: Types.ObjectId;
  quantity: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}
