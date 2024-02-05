import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.router.js"
import authRouter from './routes/auth.router.js'
import cookieParser from "cookie-parser";
import listingRouter from './routes/listingRouter.js'
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
app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listing",listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
