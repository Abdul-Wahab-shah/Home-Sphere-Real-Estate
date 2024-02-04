import express  from "express";
import {deleteUser, task, updateUser} from '../controller/user.controller.js'
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();

router.get('/task',task)
router.post('/update/:id',updateUser ,verifyToken)
router.delete('/delete/:id',updateUser ,deleteUser)

export default router;
