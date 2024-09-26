import { dbName } from "../constant.js";
import mongoose from "mongoose"




const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${dbName}`)

        console.log(`MongoDB is successfully connected ${connectionInstance.connection.host} `)


    } catch (error) {
        console.log(`MongoDB connection failed `, error)
        console.log(`${process.env.MONGODB_URL}/${dbName}`)
        process.exit(1)
    }
}

export default connectionDB