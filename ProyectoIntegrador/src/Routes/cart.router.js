import { Router } from 'express';
import * as controller from '../controllers/cart.controllers.js';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.post('/:cartId/product/:productId', controller.addProductToCart);
router.delete('/:cartId/product/:productId', controller.deleteProductFromCart);

export default router;

