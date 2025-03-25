import mongoose, { Schema } from 'mongoose';

const ProductSchema: Schema = new Schema({
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    criticalQuantity: { type: Number, required: false, default: 5 },
}, {
    timestamps: true,
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;