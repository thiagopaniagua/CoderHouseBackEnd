import { Router } from 'express';
//import { ProductManager } from '../Managers/ProductManager.js';
import * as services from '../services/product.services.js';

const router = Router();



router.get('/', async (req, res) => {
    const productsFromDB = await services.getAll();
    const products = productsFromDB.map(product => ({
        thumbnails: product.thumbnails,
        title: product.title,
        description: product.description,
        price: product.price,
        id: product.id
    }));
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const productsFromDB = await services.getAll();
    const products = productsFromDB.map(product => ({
        thumbnails: product.thumbnails,
        title: product.title,
        description: product.description,
        price: product.price,
        id: product.id
    }));
    res.render('realTimeProducts', { products });
});

export default router;
