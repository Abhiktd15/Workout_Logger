import { TryCatch } from "../middlewares/error.js";
import { Workout } from "../models/workout.model.js";

export const createWorkout = TryCatch(async(req,res) => {
    const {title,date,startTime,endTime,isCompleted,notes} = req.body

    if(!title){
        return res.status(400).json({
            message:"Title is required",
            success:false
        })
    }
    const workout = await Workout.create({
        user:req.id,
        title,
        date,
        startTime,
        endTime,
        isCompleted,
        notes
    })
    return res.status(201).json({
        message:"Workout Created",
        workout,
        success:true
    })
})

export const getAllWorkouts = TryCatch(async(req,res) => {
    const userId = req.id

    const workout = await Workout.find({user:userId}).sort({createdAt:-1})
    if(!workout){
        return res.status(404).json({
            message:"No workouts Created!",
            success:false
        })
    }
    return res.status(200).json({
            workout,
            success:true
        })
})

export const getWorkoutById = TryCatch(async(req,res) => {
    const workoutId = req.params.id
    const workout = await Workout.findById(workoutId).populate({
    path: "exercises",
    populate: { path: "sets" }
  })
    if(!workout){
        return res.status(404).json({
            message:"Workout not found",
            success:false
        })
    }
    return res.status(200).json({
            workout,
            success:true
        })
})

export const updateWorkout = TryCatch(async (req,res) => {
    const workoutId = req.params.id
    const userId = req.id

    const workout = await Workout.findOneAndUpdate(
        {
            _id:workoutId,
            user:userId
        },
        req.body,
        {new:true}
    )
    if(!workout){
        return res.status(404).json({
            message:"Workout Not Found !",
            success:false
        })
    }

    return res.status(200).json({
        message:"Workout Updated",
        workout,
        success:true
    })
})

export const deleteWorkout = TryCatch(async (req,res) => {
    const workoutId = req.params.id
    const userId = req.id

    const workout = await Workout.findOneAndDelete({_id:workoutId,user:userId})
    if(!workout){
        return res.status(404).json({
            message:"Workout Not Found !",
            success:false
        })
    }

    return res.status(200).json({
        message:"Workout Deleted",
        success:true
    })
})