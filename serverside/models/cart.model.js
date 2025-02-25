import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    product_id:{type:String,require:true},
    user_id:{type:String,require:true},
    })
export default mongoose.model.cart||mongoose.model("cart",cartSchema)
    