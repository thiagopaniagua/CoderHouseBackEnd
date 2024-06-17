import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: [String],
    status: { type: Boolean, default: true }
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
