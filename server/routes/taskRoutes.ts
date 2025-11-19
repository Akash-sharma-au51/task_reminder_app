import taskController from "../controller/taskController";
import express from "express"
import isAdmin, { isLoggedin } from "../middleware/isAdmin";

const router = express.Router();

router.post('/assigntask', isLoggedin, isAdmin, taskController.assignTask);
router.patch('/updatetask/:id', isLoggedin, isAdmin, taskController.updateTask);
router.patch('/completed/:id', isLoggedin, isAdmin, taskController.markTaskCompleted);



export default router;
