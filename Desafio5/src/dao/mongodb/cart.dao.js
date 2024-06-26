import CartModel from '../models/cart.model.js';

class CartDaoMongoDB {
    async getAll() {
        return await CartModel.find({}).populate('products.product').lean();
    }

    async getById(id) {
        return await CartModel.findById(id).populate('products.product').lean();
    }

    async create() {
        return await CartModel.create({ products: [] });
    }

    async addProductToCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        const existingProduct = cart.products.find(p => p.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        return cart;
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity--;
            } else {
                cart.products.splice(productIndex, 1);
            }
            await cart.save();
        }

        return cart;
    }

    async deleteProductFromCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        return cart;
    }
}

export default CartDaoMongoDB;
