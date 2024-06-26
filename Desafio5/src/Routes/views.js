import { Router } from 'express';
import * as services from '../services/product.services.js';
import * as cartServices from '../services/cart.services.js';
import { isLoggedIn, validateLogin } from "../middlewares/auth.js";

const router = Router();
/*
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
}); */
router.get('/', (req, res) => {
    res.redirect('/login');
});


router.get('/products', validateLogin, async (req, res) => {
    const { page = 1, limit = 10, query = '', sort = '' } = req.query;
    const productsFromDB = await services.getAll({ page, limit, query, sort });

    const products = productsFromDB.docs.map(product => ({
        thumbnails: product.thumbnails,
        title: product.title,
        description: product.description,
        price: product.price,
        id: product._id
    }));

    res.render('products', { products, user: req.session.info });
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






router.get("/login", isLoggedIn, (req, res) => {
    const error = req.session?.error;
    req.session.error = null; // Limpia el error después de renderizar
    res.render("login", { error });
});

router.get("/register", isLoggedIn, (req, res) => {
    const error = req.session?.error;
    req.session.error = null; // Limpia el error después de renderizar
    res.render("register", { error });
});

router.get("/profile", validateLogin, (req, res) => {
    const user = req.session?.info;
    res.render("profile", { user });
});

router.get("/products", validateLogin, (req, res) => {
    res.render("products");
});

export default router;
