import express from 'express';
const router = express.Router();

// Importa el ProductManager
import { ProductManager } from '../ProductManager.js';

// Crea una instancia del ProductManager
const productos = new ProductManager();

// Ruta para obtener todos los productos
// Ruta para obtener cierta cantidad de productos
router.get('/', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || undefined;
      const products = await productos.getProducts();
      if (limit !== undefined) {
        res.json(products.slice(0, limit));
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Ruta para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productos.getProductsById(pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});



// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    const {  title, description, code, price, status, stock, category, thumbnail} = req.body;
    try {
        await productos.addProduct(title, description, code, price, status, stock, category, thumbnail);
        res.status(201).send('Producto agregado correctamente');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedProperties = req.body;
    try {
        await productos.updateProducts(pid, updatedProperties);
        res.send('Producto actualizado correctamente');
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productos.deleteProductsById(pid);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
