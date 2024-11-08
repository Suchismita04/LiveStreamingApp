import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.router.js'
import otpRouter from './routes/otp.router.js'

const app=express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.static("public"))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())


app.use('/api/v1/users',userRouter)
app.use('/api/v1/otp',otpRouter)

export {app}