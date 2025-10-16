import Task from '../model/taskModel';
import { Request,Response } from "express";


const assignTask = async(req:Request,res:Response)=>{
    const {title,message,assignedto} = req.body
    try {
        if (!title||!message||!assignedto) {
            res.status(400).json({
                message:"all feilds are required",
                success:false
            })
            return
        }
        //create tasks

        const newtask = await Task.create({
            title,
            message,
            assignedto
        })

        await newtask.save()
        res.status(201).json({
            message:"task created successfully",
            success:true,
            task:newtask
        })

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
}

const updateTask = async(req:Request,res:Response)=>{
    const { id } = req.params as { id: string }
    const { title, message, assignedto } = req.body as { title?: string; message?: string; assignedto?: string }
    try {
        if (!id) {
            res.status(400).json({
                message:"task id is required",
                success:false
            })
            return
        }

        if (!title && !message && !assignedto) {
            res.status(400).json({
                message:"nothing to update",
                success:false
            })
            return
        }

        const updates: any = {}
        if (title) updates.title = title
        if (message) updates.message = message
        if (assignedto) updates.assignedto = assignedto

        const updated = await (Task as any).findByIdAndUpdate(id, updates, { new: true })
        if (!updated) {
            res.status(404).json({
                message:"task not found",
                success:false
            })
            return
        }

        res.status(200).json({
            message:"task updated successfully",
            success:true,
            task:updated
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
}

const markTaskCompleted = async(req:Request,res:Response)=>{
    const { id } = req.params as { id: string }
    try {
        if (!id) {
            res.status(400).json({
                message:"task id is required",
                success:false
            })
            return
        }

        const updated = await (Task as any).findByIdAndUpdate(id, { completed: true }, { new: true })
        if (!updated) {
            res.status(404).json({
                message:"task not found",
                success:false
            })
            return
        }

        res.status(200).json({
            message:"task marked as completed",
            success:true,
            task:updated
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
}

export default { assignTask, updateTask, markTaskCompleted }