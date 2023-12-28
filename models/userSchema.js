import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: String,    
    email:{type:String,unique:true},
    password: String,

})

export const User=mongoose.model("users",userSchema);
