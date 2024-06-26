import * as service from '../services/cart.services.js';

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.json(response);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await service.getById(id);
        if (!cart) res.status(404).json({ msg: 'Cart not found' });
        else res.json(cart);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create();
        res.json(newCart);
    } catch (error) {
        next(error);
    }
};

export const addProductToCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const updatedCart = await service.addProductToCart(cartId, productId);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
};

export const removeProductFromCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const updatedCart = await service.removeProductFromCart(cartId, productId);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const updatedCart = await service.deleteProductFromCart(cartId, productId);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
};