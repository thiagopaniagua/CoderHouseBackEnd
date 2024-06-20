import * as service from '../services/product.services.js';

export const getAll = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, query = '', sort = '' } = req.query;
        const products = await service.getAll({ page, limit, query, sort });

        const prevLink = products.hasPrevPage ? 
            `http://localhost:8080/api/products?page=${products.prevPage}&limit=${limit}&query=${query}&sort=${sort}` : 
            null;

        const nextLink = products.hasNextPage ? 
            `http://localhost:8080/api/products?page=${products.nextPage}&limit=${limit}&query=${query}&sort=${sort}` : 
            null;

        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink,
            nextLink
        });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getById(id);
        if (!prod) res.status(404).json({ msg: 'Product not found' });
        else res.json(prod);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if (!newProd) res.status(404).json({ msg: 'Error creating product' });
        else res.json(newProd);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await service.update(id, req.body);
        if (!prodUpd) res.status(404).json({ msg: 'Error updating product' });
        else res.json(prodUpd);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.remove(id);
        if (!prodDel) res.status(404).json({ msg: 'Error removing product' });
        else res.json(prodDel);
    } catch (error) {
        next(error);
    }
};