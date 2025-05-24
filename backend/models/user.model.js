import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    profile:{
        public_id:{type:String},
        url:{type:String}
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)