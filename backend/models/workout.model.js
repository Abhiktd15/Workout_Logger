import mongoose, { mongo, Mongoose } from "mongoose";

const workoutSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    startTime:{
        type:Date
    },
    endTime:{
        type:Date
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    notes:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    exercises:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Exercise"
        }
    ]
},{timestamps:true})

export const Workout = mongoose.model("Workout",workoutSchema)