import mongoose from "mongoose";

const toysSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    inSale:Boolean,
    userAdded:String,
    imgUrl:{ type: String,default:"http://localhost:5000/toys/pic3.jpg;"}
   
})

export const Toy=mongoose.model("toys",toysSchema);
