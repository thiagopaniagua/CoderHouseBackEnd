import { promises as fs } from 'fs';
import { ProductManager } from './ProductManager.js'; // Importamos el ProductManager para acceder a los productos

export class CartManager {
    constructor() {
        this.path = './src/db/carritos.json';
        this.carts = [];
        this.productManager = new ProductManager(); // Creamos una instancia de ProductManager
        this.init();
    }

    static id = 0;

    async init() {
        try {
            this.carts = await this.callCarts();
            CartManager.id = this.carts.length ? this.carts[this.carts.length - 1].id : 0;
        } catch (error) {
            console.error('Error al cargar los carritos:', error);
        }
    }

    async callCarts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async createCart() {
        CartManager.id++;
        const newCart = {
            id: CartManager.id,
            products: []
        };

        this.carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 4));
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.callCarts();
        const cart = carts.find(cart => cart.id === parseInt(id));
        if (!cart) {
            throw new Error(`El carrito con el id ${id} no se ha encontrado o no existe`);
        }
        return cart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.callCarts();
        const cart = carts.find(cart => cart.id === parseInt(cartId));
        if (!cart) {
            throw new Error(`El carrito con el id ${cartId} no se ha encontrado o no existe`);
        }

        const product = await this.productManager.getProductsById(productId); // Verificamos si el producto existe
        if (!product) {
            throw new Error(`El producto con el id ${productId} no se ha encontrado o no existe`);
        }

        const existingProduct = cart.products.find(p => p.product === parseInt(productId));
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: parseInt(productId), quantity: 1 });
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 4));
        return cart;
    }
}
