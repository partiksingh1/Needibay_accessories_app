// import { Router } from 'express';
// import { authenticate } from '../middleware/auth';
// import { checkRole } from '../middleware/roleCheck';
// import { addShop, updateShop, deleteShop, getAllShops, getShopsBySalesperson } from '../controllers/shopController';

// const router = Router();

// router.post('/', authenticate, checkRole(['Salesperson']), addShop);
// router.put('/:shopId', authenticate, checkRole(['Salesperson']), updateShop);
// router.delete('/:shopId', authenticate, checkRole(['Salesperson']), deleteShop);
// router.get('/', authenticate, checkRole(['Admin', 'Salesperson']), getAllShops);
// router.get('/user', authenticate, checkRole(['Salesperson']), getShopsBySalesperson);

// export default router;
