import express  from "express";
import {deleteUser, task, updateUser,getUserListing} from '../controller/user.controller.js'
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();

router.get('/task',task)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken ,deleteUser)
router.get('/listing/:id',verifyToken, getUserListing)

export default router;
