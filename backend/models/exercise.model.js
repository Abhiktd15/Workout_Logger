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
    workout:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workout"
    },
    sets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Set"
        }
    ]
},{timestamps:true})

export const Exercise = mongoose.model("Exercise",exerciseSchema)