import express,{Request,Response} from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import ConnectDB from "./config/db.connect"
import userRoutes from "./routes/userRoutes"
import taskRoutes from "./routes/taskRoutes"

dotenv.config()


const port = process.env.PORT


const app = express()

const corsOption = {
    origin:"*",
    methods:["GET","POST","PUT","PATCH","DELETE"]
}

//middlewares
app.use(cors(corsOption))
app.use(express.json())
app.use(morgan("dev"))





//routes
app.get("/",(req:Request,res:Response)=>{
    res.send("api is running ...")
})
app.use("/api", userRoutes)
app.use("/api", taskRoutes)


//connection
ConnectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`app is running on ${port}`)
    })
}).catch((err)=>{
    console.error("error occured in connecting db",err);
    
})


