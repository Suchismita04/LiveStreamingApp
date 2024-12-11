import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.router.js'
import otpRouter from './routes/otp.router.js'
import {Server, Socket} from 'socket.io'

const app=express()
const io=new Server(
    {
        cors:true,
    }
)


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
    socket.on('join-room',(data)=>{
        console.log("New Connection")
        const {roomID,email}=data
         console.log("room id ",roomID,"email id",email,"is joined room")
         emailToSocketMapping.set(email,socket.id)
         socket.join(roomID)
         socket.emit('joined-room',{roomID})
         socket.broadcast.to(roomID).emit('user-joined',{email})
    })
})


//Routers
app.use('/api/v1/users',userRouter)
app.use('/api/v1/otp',otpRouter)

export {app,io}