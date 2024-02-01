import express  from "express";
import {task} from '../controller/user.controller.js'

const router=express.Router();

router.get('/task',task)

export default router;
