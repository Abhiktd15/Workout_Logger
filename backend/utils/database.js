import mongoose, { mongo } from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{dbName:"Workout_Logger"})
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}