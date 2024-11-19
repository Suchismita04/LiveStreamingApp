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
const emailToSocketMapping=new Map()




io.on('connection',(socket)=>{
    socket.on('join-room',(req,res)=>{
        const {roomID,email}=req.body
         console.log("room id ",roomID,"email id",email)
         emailToSocketMapping.set(email,socket.id)
         socket.join(roomID)
         socket.broadcast.emit('user-joined',{email})
    })
})


//Routers
app.use('/api/v1/users',userRouter)
app.use('/api/v1/otp',otpRouter)

export {app,io}