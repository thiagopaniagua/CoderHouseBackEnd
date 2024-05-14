import { Router } from 'express';
import { ProductManager } from '../ProductManager.js';

const router = Router();
const productos = new ProductManager();

router.get('/', async (req, res) => {
  res.render('home', {
    title: 'Desafio4'
  });
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productos.getProducts();
    res.render('realTimeProducts', { title: 'Real Time Products', products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
