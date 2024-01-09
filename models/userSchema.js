import mongoose from "mongoose";
import * as roleType from "./roleTyps.js";
const userSchema = mongoose.Schema({
    userName: String,    
    email:{type:String,unique:true},
    password: String,
    role: {
        type: String, default:roleType.USER
    }
})

export const User=mongoose.model("users",userSchema);
