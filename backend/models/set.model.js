import mongoose, { mongo } from "mongoose";

const setSchema = new mongoose.Schema({
    reps:{type:Number},
    weight:{type:Number},
    restDuration:{type:Number},
    duration:{type:Number},
    intensity:{
        type:Number,
        min:1,max:10
    },
    isPersonalRecord:{
        type:Boolean,
        default:false
    },
    exercise:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Exercise"
    }
},{timestamps:true})

export const Set = mongoose.model("Set",setSchema)