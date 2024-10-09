import { Request, Response } from 'express';
import Shop from '../models/Shop';

// Add a new shop (Salesperson only)
export const addShop = async (req: Request, res: Response) => {
  try {
    const { shopName, location, contactInfo } = req.body;
    const assignedSalesperson = req.user?.id; // Extracted from JWT token

    const shop = new Shop({ shopName, location, contactInfo, assignedSalesperson });
    const savedShop = await shop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(500).json({ message: 'Error adding shop', error });
  }
};

// Update a shop (Salesperson only)
export const updateShop = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const updates = req.body;

    const updatedShop = await Shop.findByIdAndUpdate(shopId, updates, { new: true });
    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.json(updatedShop);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shop', error });
  }
};

// Delete a shop (Salesperson only)
export const deleteShop = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;

    const deletedShop = await Shop.findByIdAndDelete(shopId);
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shop', error });
  }
};

// Get all shops (Admin and Salesperson)
export const getAllShops = async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find().populate('assignedSalesperson');
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops', error });
  }
};

// Get shops by salesperson (Salesperson only)
export const getShopsBySalesperson = async (req: Request, res: Response) => {
  try {
    const salespersonId = req.user?.id;

    const shops = await Shop.find({ assignedSalesperson: salespersonId });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops', error });
  }
};
