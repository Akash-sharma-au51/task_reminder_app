import mongoose from "mongoose"


const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    assignedto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Task = mongoose.model("Tasks",taskSchema)

export default Task

