import { hash } from "bcrypt";
import { User } from "../models/user.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js"
import { asyncHandler } from "../utilities/asyncHandler.js"


const generateAcceessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generate Access And Refresh Tokens")
    }
}



const SignUpUser = asyncHandler(async (req, res) => {
    const {userName,email,password} = req.body;

    // console.log("key name", key)
    if (!userName || !email || !password) {
        return res.status(400).json({ msg: 'Please provide all fields' });
      }
    console.log("from body  ", req.body)

    if ([userName, email, password].some((fields) => { fields?.trim() === "" })) {
        throw new ApiError(409, "All fields are required")
    }

    const userExist = await User.findOne({
        $or: [{ userName }, { email }]
    })
 
    if (userExist) {
        throw new ApiError(409, "User is already exist")
    }

    const createdNewUser = await User.create({ userName, email, password })
    const createdUser = await User.findById(createdNewUser._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "Server Issue")
    }

    return res.status(201).json(
        new ApiResponse(200, {
            _id: createdUser._id,
            userName: createdUser.userName,
            email: createdUser.email
        }, "User is successfully registared")
    )

})


const LogInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log("Email and password", req.body)

    if (!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const isloggedInUser = await User.findOne({ email })
    if (!isloggedInUser) {
        throw new ApiError(404, "User Doesn't Exist")
    }

    const isPasswordCorrect = await isloggedInUser.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid User Credential")
    }


    const { accessToken, refreshToken } = await generateAcceessAndRefreshToken(isloggedInUser._id)
    const options = {
        httpOnly: true,
        secure: true
    }

    const loggedInUser = await User.findById(isloggedInUser._id).select('-password -refreshToken')

    res.status(200).cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            isloggedInUser: {
                _id: loggedInUser._id,
                email: loggedInUser.email
            }, accessToken, refreshToken
        }, "User Logged In successfully"))

})


const LogOutUser=asyncHandler(async(req,res)=>{
    const authorizetionHeader=req.headers.authorization
    console.log("auth",authorizetionHeader)
    if(authorizetionHeader)
    {
        const token= authorizetionHeader.split(' ')[1]
        res.status(200).json({message:"Log Out Successfully"})
    }
    else{
        throw new ApiError(401,'Authorization token missing')
    }
})

const getUserDetails=asyncHandler(async(req,res)=>{

try {
    const user= await User.findById(req.user._id).select('-password')
    if (!user) {
        throw new ApiError(404,'User not found')
    }
    res.json(user)
} catch (error) {
    throw new ApiError(500,error.message)
}

})


export { SignUpUser, LogInUser,LogOutUser,getUserDetails }