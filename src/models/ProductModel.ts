import mongoose, { Schema } from 'mongoose';

const ProductSchema: Schema = new Schema({
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, {
    timestamps: true,
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;