import CartDaoMongoDB from '../dao/mongodb/cart.dao.js';
const cartDao = new CartDaoMongoDB();

export const getAll = async () => {
    return await cartDao.getAll();
};

export const getById = async (id) => {
    return await cartDao.getById(id);
};

export const create = async () => {
    return await cartDao.create();
};

export const addProductToCart = async (cartId, productId) => {
    return await cartDao.addProductToCart(cartId, productId);
};

export const deleteProductFromCart = async (cartId, productId) => {
    return await cartDao.deleteProductFromCart(cartId, productId);
};
