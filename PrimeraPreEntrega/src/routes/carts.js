import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

const router = express.Router();

const cartsFilePath = './carrito.json';

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = {
        id: uuidv4(),
        products: []
    };
    try {
        await fs.writeFile(cartsFilePath, JSON.stringify(newCart, null, 2));
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cartData = await fs.readFile(cartsFilePath);
        const cart = JSON.parse(cartData);
        if (cart.id !== cid) {
            res.status(404).json({ error: 'Carrito no encontrado' });
        } else {
            res.json(cart.products);
        }
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para agregar un producto a un carrito por su ID
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cartData = await fs.readFile(cartsFilePath);
        let cart = JSON.parse(cartData);
        if (cart.id !== cid) {
            res.status(404).json({ error: 'Carrito no encontrado' });
        } else {
            const productIndex = cart.products.findIndex(product => product.id === parseInt(pid));
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ id: pid, quantity });
            }
            await fs.writeFile(cartsFilePath, JSON.stringify(cart, null, 2));
            res.json(cart);
        }
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
