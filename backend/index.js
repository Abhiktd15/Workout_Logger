import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { connectDB } from './utils/database.js';
import userRoute from './routes/user.routes.js'

dotenv.config({})
connectDB()

const app = express();
const corsOptions = {
    origin:"http://localhost:5173",
    credentials : true
}
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors(corsOptions))

//API ROUTES
app.use('/api/v1/user',userRoute)


const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`Server is running ${PORT}`)
})