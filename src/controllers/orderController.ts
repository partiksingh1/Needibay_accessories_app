import { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order';
import Product from '../models/Product';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, assignedDistributor } = req.body;
    const assignedSalesperson = req.user?.id; // Extracted from JWT token

    // Check if the products exist and have enough stock
    for (const { productId, quantity } of products) {
      const product = await Product.findById(productId);
      if (!product || product.stock < quantity) {
        return res.status(400).json({ message: 'Product not available or insufficient stock' });
      }
    }

    // Create new order
    const order = new Order({
      products,
      assignedSalesperson,
      assignedDistributor,
      status: 'pending',
      paymentStatus: 'unpaid'
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Update order status (Distributor updates order)
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

// View all orders (Admin and Salesperson)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('assignedSalesperson assignedDistributor products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// View orders by Salesperson or Distributor
export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    let query: any = {};
    if (userRole === 'Salesperson') {
      query.assignedSalesperson = userId;
    } else if (userRole === 'Distributor') {
      query.assignedDistributor = userId;
    }

    const orders = await Order.find(query).populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
