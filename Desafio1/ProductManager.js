class ProductManager {
    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(! title || !description || !price || !thumbnail || !code || !stock){
            return console.log('Todos los campos deben ser obligatorios');
        };

        if(this.products.some(p => p.code === code)){
            return console.log(`El code ${code} ya esta en uso`) ;
        };

        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
    };

    #getMaxId(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        });
        return maxId;
    };

    getProducts(){
        return this.products;
    };

    getProductById(id){
      const productId =  this.products.find(p => p.id == id);
      if(productId)
        return productId;
      else
        return 'Not found'

    };

};

const productManager = new ProductManager();

productManager.addProduct('Shampoo', 'Shampoo para un pelo lacio', 5000, 'https://vadirecto.com.ar/productos/4310.jpg', '1', 19);
productManager.addProduct('Acondicionador', 'Acondicionador para un pelo lacio', 6000, 'https://vadirecto.com.ar/productos/4310.jpg', '2', 17);
console.log(productManager.getProducts());
console.log(productManager.getProductById(2));
