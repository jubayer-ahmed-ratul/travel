import express from 'express';
import { reviewControllers } from '../controller/review.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, reviewControllers.createReview);
router.get('/item/:itemId', reviewControllers.getReviewsByItem);
router.delete('/:id', authenticate, authorize('admin'), reviewControllers.deleteReview);

export const ReviewRoutes = router;
