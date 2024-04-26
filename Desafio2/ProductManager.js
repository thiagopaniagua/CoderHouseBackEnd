import { promises as fs } from "fs";

class ProductManager {
    constructor() {
        this.path = "./productos.json"; 
        this.products = [];
        this.init(); // cargo los productos al inico
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

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos deben ser obligatorios');
        }

        if (this.products.some(p => p.code === code)) {
            throw new Error(`El código ${code} ya está en uso`);
        }

        ProductManager.id++; 
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct); 
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 4)); 
    };

    async callProducts() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async getProducts() {
        return this.callProducts(); 
    };

    async getProductsById(id) {
        const products = await this.callProducts();
        const product = products.find(product => product.id === id);
        if (!product) {
            throw new Error(`El producto con el id ${id} no se ha encontrado o no existe`);
        }
        return product;
    };

    async deleteProductsById(id) {
        const products = await this.callProducts();
        const filteredProducts = products.filter(product => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 4)); 
        console.log(`El producto con el id ${id} fue eliminado`);
    };

    async updateProducts(id, updatedProperties) {
        const products = await this.callProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            const updatedProduct = { ...products[index], ...updatedProperties };
            products[index] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(products, null, 4)); // productos actualizados en el archivo
            console.log("Producto actualizado:", updatedProduct);
            return updatedProduct;
        } else {
            throw new Error(`No se encontró ningún producto con el id ${id}`);
        }
    };
}

const productos = new ProductManager();


(async () => {
    try {
        await productos.addProduct("Monitor", "22 pulgadas", 120000, "imagenmonitor", "1", 7);
        await productos.addProduct("teclado", "mecánico", 45000, "imagenteclado", "2", 14);
        await productos.addProduct("mouse", "6000 dpi", 21000, "imagenmouse", "adaddn", 10);
        await productos.addProduct("Auriculares", "inalámbricos", 85000, "imagenauriculares", "3", 5);
        await productos.addProduct("Impresora", "multifunción", 155000, "imagenimpresora", "4", 3);
        await productos.addProduct("DiscoDuro", "externo", 75000, "imagendiscoduro", "5", 8);
        await productos.addProduct("CámaraSeguridad", "IP", 280000, "imagencamaraseguridad", "6", 2);
        await productos.addProduct("Altavoces", "Bluetooth", 63000, "imagenaltavoces", "7", 6);
        await productos.addProduct("MemoriaUSB", "alta velocidad", 40000, "imagenmemoriausb", "8", 10);
        await productos.addProduct("Ratón", "ergonómico", 37000, "imagenraton", "9", 9);
        await productos.addProduct("Teclado", "retroiluminado", 105000, "imagenteclado", "11", 4);
        await productos.addProduct("Monitor", "curvo", 220000, "imagenmonitor", "11", 3);
        await productos.addProduct("TabletaGráfica nashe", "profesional asd", 320000, "imagentableta", "12");

        // console.log(await productos.getProducts());
        // console.log(await productos.getProductsById(3));
        // await productos.deleteProductsById(2);
        //await productos.updateProducts(1, { title: "Monitor Samsung", code: "14" });
    } catch (error) {
        console.error("Error:", error.message);
    }
})();