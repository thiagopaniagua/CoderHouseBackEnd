import ProductModel from '../models/product.model.js';

class ProductDaoMongoDB {
    async getAll() {
        return await ProductModel.find({});
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
