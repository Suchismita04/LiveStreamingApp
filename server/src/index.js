import dotenv from "dotenv"
import { app } from "./app.js"
import connectionDB from "./db/connection.js"


dotenv.config({
path:'./env'
})

connectionDB().then(()=>{
    app.listen(process.env.PORT ||3000)
    console.log(`Server is running at port no: ${process.env.PORT}`)
}
).catch((error)=>{
   console.log(`Server is crushed`,error)
})