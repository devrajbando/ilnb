import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'


import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'
import { mongoose } from "mongoose";
import {mfData} from '../data/mfData.js'
import {stockData} from '../data/stockData.js'

const generateAccessAndRefreshToken=async(userId)=>
    {
        try {
            const user=await User.findById(userId)
            const accessToken=user.generateAcessToken()
            const refreshToken=user.generateRefreshToken()
            user.refreshToken=refreshToken
            await user.save({validateBeforeSave:false})
            console.log("reached user.controller.js ",accessToken)
            return {accessToken,refreshToken}
        } catch (error) {
            console.log(error.message)
            throw new ApiError(500,"something went wrong on our side")
        }
    }

const registerUser=asyncHandler(async(req,res)=>{
    try {
        const {
            name,
            email,
            password,
            score
        }=req.body;
            console.log(req.body)
    
    
            const existedUser=await User.findOne({
                $or:[{email}]
            })
            if(existedUser){
                return res.status(409)
                .json({

                    
                    status: 409,
                    message: "User with email or username already exists",
                }
                )
            }
            console.log(existedUser)

            const newPassword = await bcrypt.hash(password, 10)
            console.log(newPassword)
            console.log(password,"while signing up")
            const user=await User.create({
                name:req.body.name,
                email:req.body.email,
                password:newPassword,
                score:req.body.score,
                stocks:stockData,
                mutualFunds:mfData,
            })
    
            const createdUser=await User.findById(user._id).select(
                "-password -refreshToken"
            )
    
            if(!createdUser){
                throw new ApiError(500 ,"something went wrong on our side")
            }
        
            
            return res.status(201).json(
                new ApiResponse(201,createdUser,"User created Successfully")
            )
    } catch (error) {
        // throw new ApiError(500,"something went wrong")
        console.log(error)
    }
})
const checkAuth=asyncHandler(async(req,res)=>{
    res.status(200)
})
const LoginUser=asyncHandler(async(req,res)=>{
    
    
    const {email,password }=req.body
    if(!email)
        throw new ApiError(400,"email is required")

    const user=await User.findOne({email})
    
    console.log(user)
    if(!user)
        throw new ApiError(404,"user does  not exist")

    

    // const isPasswordValid=password === user.password ? true:false

    const isPasswordValid=await bcrypt.compare(
		password,
		user.password)
    
        
        console.log(isPasswordValid)
    if(!isPasswordValid)
        throw new ApiError(401,"INCORRECT password")

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)


    const loggedInUser=await User.findById(user._id).select("-password -refreshToken") 

    const options={
        httpOnly:true,//for local its false, later set true
        secure:true,
        sameSite: "None",
    }
    console.log("reached final point ")
    return res   
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(
        200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User Logged In Succesfully"
    ))



})

const LogoutUser=asyncHandler(async(req,res)=>{

    const {password}=req.body
    const user=await User.findById(req.user._id)

    // const isPasswordValid=await user.isPasswordCorrect(password)
    
    const isPasswordValid=await bcrypt.compare(
        password,
		user.password)
        // console.log(isPasswordValid)
        console.log(password)
        console.log(user.password)
    // const isPasswordValid=password === user.password ? true:false
        if(!isPasswordValid)
            throw new ApiError(401,"INCORRECT password")
        
        
    await User.findByIdAndUpdate (req.user._id,{
        $unset:{
            refreshToken:1
        }
    },{
        new:true
    })
        

        const options={
            httpOnly:true,
            secure:false
//turn to true during production       
 }

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logged Out"))
    })



const CurrentUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    const email=user.email
    const username=user.username
    return res
    .status(200)
    .json(new ApiResponse(200,{email,username},"User data"))
    
})

const getStocks=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const stocks=await User.findById(userId).select("stocks")
    
    if(!stocks){
        return res.status(409).json({
            status: 409,
            message: "Stocks not found",
        })
    }
   
    return res.status(200).json(new ApiResponse(200,stocks,"Stocks fetched successfully"))
})
const getMFunds=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const mutualFunds=await User.findById(userId).select("mutualFunds")
    
    if(!mutualFunds){
        return res.status(409).json({
            status: 409,
            message: "mutualFunds not found",
        })
    }
   
    return res.status(200).json(new ApiResponse(200,mutualFunds,"mutualFunds fetched successfully"))
})



export {generateAccessAndRefreshToken,
    // verifyEmail,
    registerUser,
    LoginUser,
    LogoutUser
    ,checkAuth,
    CurrentUser,
    getStocks,
    getMFunds
    
}