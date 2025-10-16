import taskController from "../controller/taskController";
import express from "express"
import isAdmin, { isLoggedin } from "../middleware/isAdmin";

const router = express.Router();

router.post('/assigntask', isLoggedin, isAdmin, taskController.assignTask);
router.patch('/updatetask',isLoggedin,isAdmin,taskController.updateTask)
router.post('/completed',isAdmin,isLoggedin,taskController.markTaskCompleted)



export default router;
