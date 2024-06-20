import { Router } from 'express';
import * as services from '../services/product.services.js';
import * as cartServices from '../services/cart.services.js';

const router = Router();

router.get('/', async (req, res) => {
    const { page = 1, limit = 10, query = '', sort = '' } = req.query;
    const productsFromDB = await services.getAll({ page, limit, query, sort });
    const products = productsFromDB.docs.map(product => ({
        thumbnails: product.thumbnails,
        title: product.title,
        description: product.description,
        price: product.price,
        id: product._id
    }));
    res.render('home', { products });
});

router.get('/products', async (req, res) => {
    const { page = 1, limit = 10, query = '', sort = '' } = req.query;
    const productsFromDB = await services.getAll({ page, limit, query, sort });

    const products = productsFromDB.docs.map(product => ({
        thumbnails: product.thumbnails,
        title: product.title,
        description: product.description,
        price: product.price,
        id: product._id
    }));

    res.render('products', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const { page = 1, limit = 10, query = '', sort = '' } = req.query;
    const productsFromDB = await services.getAll({ page, limit, query, sort });
    const products = productsFromDB.docs.map(product => ({
        thumbnails: product.thumbnails,
        title: product.title,
        description: product.description,
        price: product.price,
        id: product._id
    }));
    res.render('realTimeProducts', { products });
});
 /* 
router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartServices.getById(cid);

    if (!cart) {
        res.status(404).send('Cart not found');
        return;
    }

  const cartProducts = cart.products.map(cartItem => ({
        title: cartItem.product.title,
        description: cartItem.product.description,
        price: cartItem.product.price * cartItem.quantity,
        quantity: cartItem.quantity,
        id: cartItem.product._id
    }));

    res.render('cart', { cartProducts });
}); */

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartServices.getById(cid);
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const cartProducts = cart.products.map(p => ({
            product: p.product,
            quantity: p.quantity
        }));

        res.render('cart', { cartProducts, cartId: cid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching cart' });
    }
});


export default router;
