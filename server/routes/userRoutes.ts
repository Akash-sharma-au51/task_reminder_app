import express from "express"
import userController from "../controller/userController";

import isAdmin from "../middleware/isAdmin"


const router = express.Router()

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

export default router;