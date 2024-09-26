import { User } from "../models/user.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js"
import { asyncHandler } from "../utilities/asyncHandler.js"



// const SignInUser=asyncHandler(async(req,res)=>{

// const {userName,email,password}=req.body
// console.log("User data=",req.body)

// if ([userName,email,password].some((fields)=>{fields?.trim()===""})) {
//     throw new ApiError(400,"All fields are required")
// }

// const userExit= await User.findOne({
//     $or:[{userName},{email}]
// })
// if (userExit) {
//     throw new ApiError(409,"User is already exit")
// }

// const createNewUser=User.create({
//     userName,email,password
// })

// const createdUser=await User.findById(createNewUser._id).select('-password -refreshToken')
// if (createdUser) {
//     throw new ApiError(500,"Server issue")
// }

// return res.status(201).json(
//      new ApiResponse(200,{
//         id:createdUser._id,
//        userName:createdUser.userName,
//        email:createdUser.email
//      },"User is successfully created")
// )



// })

const SignInUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    console.log(req.body)
    if ([userName, email, password].some((fields) => { fields?.trim() === "" })) {
        throw new ApiError(409, "All fields are required")
    }

    const userExist = await User.findOne({
        $or: [{ userName }, { email }]
    })
    console.log("user exist", userExist)
    if (!userExist) {
        throw new ApiError(409, "User is already exist")
    }

    const createdNewUser = await User.create({ userName, email, password })
    const createdUser = await User.findById(createdNewUser._id).select("-password -refreshToken")
    if (createdUser) {
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


export { SignInUser }