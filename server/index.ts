import express,{Request,Response} from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import ConnectDB from "./config/db.connect"

dotenv.config()


const port = process.env.PORT


const app = express()

//middlewares
app.use(express.json())
app.use(morgan("dev"))





//routes

app.get("/",(req:Request,res:Response)=>{
    res.send("api is running ...")
})


//connection
ConnectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`app is running on ${port}`)
    })
}).catch((err)=>{
    console.error("error occured in connecting db",err);
    
})


