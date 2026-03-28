import express from 'express';
import { itemControllers } from '../controller/item.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, authorize('admin'), itemControllers.createItem);
router.get('/', itemControllers.getItems);
router.get('/:id', itemControllers.getItemById);
router.patch('/:id', authenticate, authorize('admin'), itemControllers.updateItem);
router.delete('/:id', authenticate, authorize('admin'), itemControllers.deleteItem);

export const ItemRoutes = router;
