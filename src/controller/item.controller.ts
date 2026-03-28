import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Item } from '../model/item.model';

const createItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await Item.create({ ...req.body, createdBy: req.user?.email });
    res.status(201).json({ success: true, message: 'Item created', data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to create item', error: err.message });
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const { search, category, priceMin, priceMax, rating, sort, page = 1, limit = 10 } = req.query;

    const filter: any = {};
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
    if (category) filter.category = category;
    if (priceMin || priceMax) filter.price = { ...(priceMin && { $gte: Number(priceMin) }), ...(priceMax && { $lte: Number(priceMax) }) };
    if (rating) filter.rating = { $gte: Number(rating) };

    const sortObj: any = sort ? { [String(sort).replace('-', '')]: String(sort).startsWith('-') ? -1 : 1 } : { createdAt: -1 };
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Item.countDocuments(filter);
    const data = await Item.find(filter).sort(sortObj).skip(skip).limit(Number(limit));

    res.status(200).json({ success: true, data, meta: { page: Number(page), limit: Number(limit), total } });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch items', error: err.message });
  }
};

const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch item', error: err.message });
  }
};

const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, message: 'Item updated', data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to update item', error: err.message });
  }
};

const deleteItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to delete item', error: err.message });
  }
};

export const itemControllers = { createItem, getItems, getItemById, updateItem, deleteItem };
