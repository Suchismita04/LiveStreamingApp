import crypto from 'crypto'
import sendOTPemail from '../mailer.js'
import {User} from '../models/user.model.js'
import { asyncHandler } from '../utilities/asyncHandler.js'
import { ApiError } from '../utilities/ApiError.js'
import { ApiResponse } from '../utilities/ApiResponse.js'


const generateOTP= crypto.randomInt(100000,999999)

// Request For generating otp
const  requestOTP=asyncHandler(async(req,res)=>{
      const {email}=req.body
      const otp=generateOTP
      const expTimeAt= Date.now()+5*60*1000

     try {
         const user=await User.findOneAndUpdate(
           {email},{otp,otpExpiresAt:expTimeAt},
           {new:true,upsert:true}
         )


         await sendOTPemail(email,otp)

         res.status(200).json({message:'OTP sent to email'})
     } catch (error) {
        res.status(500).json({message:'Soomething went wrong'})
     }


})

//Verify otp

const verifyOTP=asyncHandler(async(req,res)=>{

    const {email,otp}=req.body
    const user=await User.findOne({email})

    if (!user) {
        throw new ApiError(404,'User not found')
    }
const isOtpValid= user.otp === otp  && otpExpiresAt> Date.now()

try {
    if (isOtpValid) {
        user.otp=null
        user.otpExpiresAt=null
        await user.save()
        new ApiResponse(200,'OTP successfully verified')
    }
    else{
        throw new ApiError(400,'Invalid or expired OTP.')
    }



} catch (error) {
    throw new ApiError(500,'Error verifying OTP')
}


})


export {requestOTP,verifyOTP}