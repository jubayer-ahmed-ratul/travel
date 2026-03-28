import { Types } from 'mongoose';

export interface IReview {
  rating: number;
  comment: string;
  userId: Types.ObjectId;
  itemId: Types.ObjectId;
}
