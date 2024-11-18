import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.router.js'
import otpRouter from './routes/otp.router.js'
import {Server, Socket} from 'socket.io'

const app=express()
const io=new Server()


//Middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.static("public"))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())


//io connection
io.on('connection',(socket)=>{
    
})


//Routers
app.use('/api/v1/users',userRouter)
app.use('/api/v1/otp',otpRouter)

export {app,io}