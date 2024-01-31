import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.router.js"
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongo is connected")
}).catch(()=>{
    console.log("error")
})

const app=express()

app.listen(3000,()=>{
    console.log('Server is run on port 3000')
});

app.use("/api/user",userRouter)