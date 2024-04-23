import {promises as fs} from "fs";
import { stringify } from "querystring";

class ProductManager {
    constructor(){
        this.patch = "./productos.json";
        this.products = [];
    };

    static id = 0;

    addProduct = async (title, description, price,  thumbnail, code, stock) => {
        

        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        };
        this.products.push(newProduct);
        //console.log(newProduct);
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };
    callProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8");
        return JSON.parse(respuesta);
    }
    getProducts = async() => {
        let respuesta2 = await this.callProducts();
        return console.log(respuesta2);
    };

    getProductsById = async (id) => {
        let rerspuesta3 = await this.callProducts();
        if (! rerspuesta3.find(product => product.id === id)){
            console.log(`El producto con el id ${id} no se ha encontrado o no existe`)
        }else{
            console.log(rerspuesta3.find(product => product.id === id));
        };
        
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.callProducts();
        let filterProduct = respuesta3.filter(product => product.id != id);
        await fs.writeFile(this.patch, JSON.stringify(filterProduct));
        console.log(`El producto con el id ${id} fue eliminado`);
    };

    updateProducts = async ({id, ...product}) => {
        await this.deleteProductsById(id);
        let productsOld = await this.callProducts();
        let upProduct = [
            {...product, id},
            ...productsOld
        ];
        await fs.writeFile(this.patch, JSON.stringify(upProduct));
    };

};

const productos = new ProductManager;

productos.addProduct("Monitor", "22pulgadas", 120000, "imagenmonitor", "adasn", 7);
productos.addProduct("teclado", "mecanico", 45000, "imagenteclado", "adadn", 14); 
productos.addProduct("mouse", "6000dpi", 21000, "imagenmouse", "adaddn", 10); 
 

//productos.getProducts();

//productos.getProductsById(3);

//productos.deleteProductsById(2);

/*productos.updateProducts({
    title: 'mouse',
    description: '6500dpi',
    price: 23000,
    thumbnail: 'imagenmouse',
    code: 'adaddn',
    stock: 7,
    id: 3
  });*/
