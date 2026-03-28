import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Review } from '../model/review.model';

const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await Review.create({ ...req.body, userId: req.user?.id });
    res.status(201).json({ success: true, message: 'Review added', data: review });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to add review', error: err.message });
  }
};

const getReviewsByItem = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ itemId: req.params.itemId }).populate('userId', 'name email');
    res.status(200).json({ success: true, data: reviews });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: err.message });
  }
};

const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to delete review', error: err.message });
  }
};

export const reviewControllers = { createReview, getReviewsByItem, deleteReview };
