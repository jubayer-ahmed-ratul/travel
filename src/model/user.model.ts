import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../config';
import { IUser } from '../types/user.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'user', 'staff'], default: 'user' },
}, {
  timestamps: true,
});

// Pre-save middleware / hook : will run before saving a document
userSchema.pre('save', async function () {
  const user = this;
  if (!user.isModified('password')) return;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds)
  );
});

// Post-save middleware / hook : will run directly after saving a document
userSchema.post('save', function (user) {
  console.log(`[Post-Save Hook]: A new user was created with email: ${user.email}`);
  user.password = '';
});

export const User = model<IUser>('User', userSchema);