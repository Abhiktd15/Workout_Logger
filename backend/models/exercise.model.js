import mongoose, { mongo } from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    muscles:[{type:String}],
    equipments:{
        type:String
    },
    type:{
        type:String,
        enum:["strength","cardio","stretching"],
        default:"strength"
    },
    sets:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Set"
    },
    workout:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workout"
    },
},{timestamps:true})

export const Exercise = mongoose.model("Exercise",exerciseSchema)