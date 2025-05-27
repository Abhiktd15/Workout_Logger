import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcryptjs'
import { User } from "../models/user.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'

export const registerUser = TryCatch(async (req,res) => {
    const {fullName,email,password} = req.body;
    if(!fullName || !email || !password){
        return res.status(400).json({
            message:"All Fields are required",
            success:false
        })
    }
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({
            message:"User Already Exists with this email",
            success:false
        })
    }
    
    const file = req.file;
    console.log(file)
    let fileURI; 
    let cloudResponse;

    if(file){
        console.log("working1")
        fileURI = getDataUri(file)
        cloudResponse = await cloudinary.uploader.upload(fileURI.content)
    }

    const hashPassword = await bcrypt.hash(password,10)
    
    const user =new User({
        fullName,
        email,
        password:hashPassword,
        profile: {
            public_id:cloudResponse?.public_id,
            url:cloudResponse?.secure_url
        } 
    })
    const doc = await user.save()
    console.log(doc,"working 2")
    const tokenData = {
        userId : doc._id
    }
    const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY)

    return res.
        cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:"strict"})
        .status(201).json({
            message:`Welcome Back ${doc.fullName}`,
            user:{
                _id:doc._id,
                fullName:doc.fullName,
                profile:doc.profile,
                email:doc.email
            },
            success:true
        })

})
export const loginUser = TryCatch(async (req,res) => {
    const {email,password} = req.body;
    if( !email || !password){
        return res.status(400).json({
            message:"All Fields are required",
            success:false
        })
    }
    let user = await User.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"User Doesn't Exists!",
            success:false
        })
    }

    const checkPassword = await bcrypt.compare(password,user.password)
    if(!checkPassword){
        return res.status(400).json({
            message:"Invalid Credentials !",
            success:false
        })
    }

    const tokenData = {
        userId : user._id
    }
    const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY)

    user = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profile:user.profile
    }
    
    return res.
        cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:"strict"})
        .status(200).json({
            message:`Welcome Back ${user.fullName}`,
            user,
            success:true
        })

})
export const logoutUser = TryCatch(async (req,res) => {
    return res.cookie('token',"",{maxAge:0}).status(200).json({
        message:"User Logged Out Successfully !",
        success:true
    })
})

export const isAuthorized  = TryCatch(async (req,res) => {
    const userId = req.id
    let user = await User.findById(userId)
    if(!user) {
        return res.status(404).json({
            message:"User Not Found!",
            success:false
        })
    }
    user = {
        _id: user._id,
        fullName:user.fullName,
        email:user.email,
        profile: user.profile
    }
    return res.status(200).json({
        message:`Welcome Back ${user.fullName}`,
        user,
        success:true
    })

})

export const updateProfile = TryCatch(async (req,res) => {
    const userId = req.id;
    const {fullName,email,password} = req.body;
    const file = req.file

    let user = await User.findById(userId)
    if(!user){
        return res.status(404).json({
            message:"User not found !",
            success:false
        })
    }

    let hashPassword;
    if(password){
        hashPassword = await bcrypt.hash(password,10)
    }

    let fileURI; 
    let cloudResponse;

    if(file){
        fileURI = getDataUri(file)
        cloudResponse = await cloudinary.uploader.upload(fileURI.content)
    }
    //delete the previous image stored on cloudinary
    await cloudinary.uploader.destroy(user.profile.public_id,{invalidate:true})

    if(fullName) user.fullName = fullName
    if(email) user.email = email
    if(password) user.password = hashPassword
    if(file){
        user.profile  = {
            public_id:cloudResponse?.public_id,
            url:cloudResponse?.secure_url
        }
    }  
    await user.save()

    user = {
        _id :user._id,
        fullName:user.fullName,
        email:user.email,
        profile:user.profile
    }

    return res.status(200).json({
        message:"Profile Updated Successfully !",
        user,
        success:true
    })
})

