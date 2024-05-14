import { promises as fs } from "fs";

export class ProductManager {
    constructor() {
        this.path = "./productos.json"; 
        this.products = [];
        this.init(); // cargo los productos al inicio
    }

    static id = 0;

    async init() {
        try {
            this.products = await this.callProducts(); 
            ProductManager.id = this.products.length; 
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    }

    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Todos los campos deben ser obligatorios');
        }

        if (this.products.some(p => p.code === code)) {
            throw new Error(`El código ${code} ya está en uso`);
        }

        ProductManager.id++; 
        const newProduct = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
            id: ProductManager.id
        };

        this.products.push(newProduct); 
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 4)); 
    }

    async callProducts() {
        const data = await fs.readFile(this.path, "utf-8");
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
        const filteredProducts = products.filter(product => product.id !== parseInt(id));
        await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 4)); 
        console.log(`El producto con el id ${id} fue eliminado`);
    }

    async updateProducts(id, updatedProperties) {
        const products = await this.callProducts();
        const index = products.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
            const updatedProduct = { ...products[index], ...updatedProperties };
            products[index] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(products, null, 4)); // productos actualizados en el archivo
            console.log("Producto actualizado:", updatedProduct);
            return updatedProduct;
        } else {
            throw new Error(`No se encontró ningún producto con el id ${id}`);
        }
    }
}
