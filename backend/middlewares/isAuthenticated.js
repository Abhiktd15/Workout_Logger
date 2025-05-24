import { TryCatch } from "./error.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = TryCatch(async(req ,res,next) => {
    const {token} = req.cookies
    if(!token){
        return res.status(404).json({
            message:"Unauthorized !!",
            success:false
        })
    }
    const decodeToken = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decodeToken){
        return res.status(404).json({
            message:"Invalid Token",
            success:false
        })
    }

    req.id = decodeToken.userId
    next()
})