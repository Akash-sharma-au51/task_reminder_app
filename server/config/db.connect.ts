import mongoose from "mongoose"
import dotenv from "dotenv"


const uri:any = process.env.MONGO_URI

dotenv.config()


const ConnectDB = async()=>{
    try {
        await mongoose.connect(uri)

        
    } catch (error) {
        console.error("error connecting to database",error);
        
        
    }
}
export default ConnectDB