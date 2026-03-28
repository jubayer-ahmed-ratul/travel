import { Schema, Types, model } from 'mongoose';
import { IReview } from '../types/review.interface';

const reviewSchema = new Schema<IReview>({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
}, { timestamps: true });

export const Review = model<IReview>('Review', reviewSchema);
