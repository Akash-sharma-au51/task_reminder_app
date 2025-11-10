import User from "../model/userModel";
import {Request,Response} from "express"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config()

const secretkey = process.env.JWT_SECRET || 'fallback_secret_key'

const registerUser = async(req:Request,res:Response)=>{
    const {name,username,email,password,isAdmin} = req.body
    try {
        if (!name ||!username||!email||!password) {
            res.status(400).json({
                message:"all feilds are required",
                success:false
            })}
        
        const existinguser = await User.findOne({email})

        if (existinguser) {
            res.status(400).json({
                message:"user already exist pls login",
                success:false
            })}
    
        
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)

    //new user
    const newuser = await User.create({
        name,
        username,
        email,
        password:hashedpassword,
        isAdmin: Boolean(isAdmin)
    })

    await newuser.save()

    //token

    const token = jwt.sign({id:newuser._id,email:newuser.email,isAdmin:newuser.isAdmin},secretkey,{expiresIn:"1h"})

    //success

    res.status(200).json({
        message:"user registered successfully",
        success:true,
        token
    })


        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
        
    }
}


const loginUser = async(req:Request,res:Response)=>{
    const {username,email,password} = req.body
    try {
        if (!username||!email||!password) {
            res.status(400).json({
                message:"all feild are required",
                success:false
            })
            return
        }
        const user = await User.findOne({email})

        if (!user) {
            res.status(400).json({
                message:"user not found",
                success:false
            })
            return
        }
        //check password match

        if (typeof user.password !== "string") {
            res.status(400).json({
                message:"invalid user credentials",
                success:false
            })
            return
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if (!isPasswordMatch) {
            res.status(400).json({
                message:"invalid username or password",
                success:false
            })
            return
        }

        const token = jwt.sign({id:user._id,email:user.email,isAdmin:user.isAdmin}, secretkey, {expiresIn:"1h"})

        res.status(200).json({
            message:"login successful",
            success:true,
            token
        })

    } catch (error) {
        
    }
}

const logoutUser = async(req:Request,res:Response)=>{
    try {

        res.status(200).clearCookie('token').json({
            message:"user logged out successfully",
            success:true
        })
        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })

        
    }
}


export default {registerUser,loginUser,logoutUser}



