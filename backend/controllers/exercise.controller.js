import { TryCatch } from "../middlewares/error.js";
import { Exercise } from "../models/exercise.model.js";
import { Workout } from "../models/workout.model.js";

export const createExercise = TryCatch(async (req, res) => {
    const { name, muscles, equipments, type } = req.body;
    const { workoutId } = req.params;

    const exercise = await Exercise.create({
        name,
        muscles,
        equipments,
        type,
        workout: workoutId,
    });

    await Workout.findByIdAndUpdate(workoutId,{
        $push:{exercises:exercise._id}
    })
    
    return res.status(201).json({
        message:"Exercise Created Successfully !",
        exercise,
        success:true
    })
});

export const updateExercise = TryCatch(async (req, res) => {
    const { workoutId } = req.params;
    const {exerciseId} = req.body

    const exercise = await Exercise.findOneAndUpdate({workout:workoutId,_id:exerciseId},req.body,{new:true});    

    return res.status(200).json({
        message:"Updated Successfully !",
        exercise,
        success:true
    })
});
export const deleteExercise = TryCatch(async (req, res) => {
    const { exerciseId } = req.params;

    const exercise = await Exercise.findByIdAndDelete(exerciseId);    

    return res.status(200).json({
        message:"Deleted Successfully !",
        success:true
    })
});
