import { TryCatch } from "../middlewares/error.js";
import { Exercise } from "../models/exercise.model.js";
import { Set } from "../models/set.model.js";


export const addSets = TryCatch(async (req,res) => {
    const {reps,weight,restDuration,duration,intensity,exerciseId} = req.body

    //find the stronges previour sets for the exercise 
    const bestPreviousSet = await Set.findOne({
        exercise:exerciseId
    }).sort({weight:-1,reps:-1})
    // Default to false
    let isPR = false;

    if (!bestPreviousSet || weight > bestPreviousSet.weight || 
        (weight === bestPreviousSet.weight && reps > bestPreviousSet.reps)) {
        isPR = true;
    }

    const set = await Set.create({
        reps,
        weight,
        restDuration,
        duration,
        intensity,
        isPersonalRecord:isPR,
        exercise:exerciseId
    })
    //Attach to the exercise 
    await Exercise.findByIdAndUpdate(exerciseId,{
        $push:{
            sets:set._id
        }
    })

    return res.status(201).json({
        message:"Sets Created",
        set,
        success:true
    })
    
})

export const updateSet = TryCatch(async (req,res) => {
    const {setId,reps,weight,restDuration,duration,intensity,exerciseId} = req.body

    //find the stronges previour sets for the exercise 
    const bestPreviousSet = await Set.findOne({
        exercise:exerciseId,
        _id: { $ne: setId }
    }).sort({weight:-1,reps:-1})
    // Default to false
    let isPR = false;

    if (!bestPreviousSet || weight > bestPreviousSet.weight || 
        (weight === bestPreviousSet.weight && reps > bestPreviousSet.reps)) {
        isPR = true;
    }

    const set = await Set.findByIdAndUpdate(setId,
        {
            reps,
            weight,
            restDuration,
            duration,
            intensity,
            isPersonalRecord:isPR
        },{new:true}
    )
    if(!set){
        return res.status(404).json({
            message:"Set not found !",
            success:false
        })
    }

    return res.status(201).json({
        message:"Sets Updated Successfully",
        set,
        success:true
    })
    
})

export const deleteSet = TryCatch(async(req,res) => {
    const {setId} = req.body
    const set = await Set.findById(setId)
    if(!set){
        return res.status(404).json({
            message:"Set Not Found !",
            success:false
        })
    }
     // Remove the set reference from Exercise
    // await Exercise.findByIdAndUpdate(set.exercise, {
    //     $pull: { sets: set._id }
    // });
    await set.deleteOne()
    return res.status(200).json({
        message:"Set Deleted Successfully!",
        success:true
    })
    
})