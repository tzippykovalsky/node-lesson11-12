import mongoose from "mongoose";

const toysSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    inSale:Boolean,
    age:Number
})

export const Toy=mongoose.model("toys",toysSchema);
