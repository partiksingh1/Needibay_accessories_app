// import { Router } from 'express';
// import { authenticate } from '../middleware/auth';
// import { checkRole } from '../middleware/roleCheck';
// import { createOrder, updateOrderStatus, getAllOrders, getOrdersByUser } from '../controllers/orderController';

// const router = Router();

// router.post('/', authenticate, checkRole(['Salesperson']), createOrder);
// router.patch('/:orderId/status', authenticate, checkRole(['Distributor']), updateOrderStatus);
// router.get('/', authenticate, checkRole(['Admin', 'Salesperson']), getAllOrders);
// router.get('/user', authenticate, checkRole(['Salesperson', 'Distributor']), getOrdersByUser);

// export default router;
