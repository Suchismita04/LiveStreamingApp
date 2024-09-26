import mongoose, { Schema } from "mongoose";

import Jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const userShema=new Schema(
   {
     userName:{
        type:String,
        require:true,
        unique:true
    },
     email:{
        type:String,
        require:true,
     },
    password:{
        type:String,
        require:true,
    },
    
        refreshToken: {
            type: String
        }


},
{
    timestamps:true
}

)


//encrypt and save the password
userShema.pre("save",async function(next) {
    if (!this.isModified("password"))   return next()
      
  this.password=await bcrypt.hash(this.password,10)
   next()
})

userShema.methods.generateAccessToken=function(){
   return Jwt.sign(
    {
        _id:this._id,
        userName:this.userName,
        email:this.email
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}

userShema.methods.generateRefreshToken=function(){
    return Jwt.sign(
        {
            _id:this._id
        },process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User=mongoose.model("User",userShema)