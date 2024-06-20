import ProductDaoMongoDB from '../dao/mongodb/product.dao.js';
const productDao = new ProductDaoMongoDB();

export const getAll = async (params) => {
    return await productDao.getAll(params);
};

export const getById = async (id) => {
    return await productDao.getById(id);
};

export const create = async (obj) => {
    return await productDao.create(obj);
};

export const update = async (id, obj) => {
    return await productDao.update(id, obj);
};

export const remove = async (id) => {
    return await productDao.delete(id);
};
