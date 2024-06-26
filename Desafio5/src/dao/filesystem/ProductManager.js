import { promises as fs } from 'fs';

export class ProductManager {
    constructor() {
        this.path = './src/db/productos.json'; 
        this.products = [];
        this.init();
    }

    static id = 0;

    async init() {
        try {
            this.products = await this.callProducts();
            ProductManager.id = this.products.length ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    async addProduct(title, description, price, code, stock, category, thumbnails = []) {
        // Validaciones de tipo
        if (typeof title !== 'string' || typeof description !== 'string' || typeof price !== 'number' || 
            typeof code !== 'string' || typeof stock !== 'number' || typeof category !== 'string' ||
            !Array.isArray(thumbnails)) {
            throw new Error('Campos inválidos, por favor verifica los tipos de datos.');
        }

        if (!title || !description || !price || !code || !stock || !category) {
            throw new Error('Todos los campos deben ser obligatorios, excepto thumbnails');
        }

        if (this.products.some(p => p.code === code)) {
            throw new Error(`El código ${code} ya está en uso`);
        }

        ProductManager.id++;
        const newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            code,
            stock,
            category,
            thumbnails,
            status: true
        };

        this.products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 4));
        return newProduct;
    }

    async callProducts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getProducts() {
        return this.callProducts();
    }

    async getProductsById(id) {
        const products = await this.callProducts();
        const product = products.find(product => product.id === parseInt(id));
        if (!product) {
            throw new Error(`El producto con el id ${id} no se ha encontrado o no existe`);
        }
        return product;
    }

    async deleteProductsById(id) {
        const products = await this.callProducts();
        const filteredProducts = products.filter(product => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 4));
    }

    async updateProducts(id, updatedProperties) {
        const products = await this.callProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            const updatedProduct = { ...products[index], ...updatedProperties };
            products[index] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(products, null, 4));
            return updatedProduct;
        } else {
            throw new Error(`No se encontró ningún producto con el id ${id}`);
        }
    }
}
