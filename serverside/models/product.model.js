import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true },
    sizes: { type: [String], required: true },
    images: { type: [String], required: true },
    material: { type: String, required: true },
    description: { type: String, required: true },
    sellerId: { type: String, required: true },
    offer:{type:Number},
    block:{type:Boolean},
    reviews: [{ user_id: mongoose.Schema.Types.ObjectId, rating: Number, comment: String }],

});

export default mongoose.models.product || mongoose.model("product", productSchema);
