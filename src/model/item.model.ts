import { Schema, model } from 'mongoose';
import { IItem } from '../types/item.interface';

const itemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  location: { type: String },
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
}, { timestamps: true });

export const Item = model<IItem>('Item', itemSchema);
