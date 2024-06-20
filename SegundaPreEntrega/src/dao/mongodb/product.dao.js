import ProductModel from '../models/product.model.js';

class ProductDaoMongoDB {
    async getAll({ page = 1, limit = 10, query = '', sort = '' }) {
        try {
            const filter = query ? {
                $or: [
                    { title: new RegExp(query, 'i') },
                    { category: new RegExp(query, 'i') }
                ]
            } : {};

            const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

            const options = {
                page,
                limit,
                sort: sortOption
            };

            return await ProductModel.paginate(filter, options);
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        return await ProductModel.findById(id);
    }

    async create(obj) {
        return await ProductModel.create(obj);
    }

    async update(id, obj) {
        return await ProductModel.findByIdAndUpdate(id, obj, { new: true });
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

export default ProductDaoMongoDB;
