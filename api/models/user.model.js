import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1gUkwRDku5HsYvJJFKhEVx&ust=1707065139091000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJDvv6zPj4QDFQAAAAAdAAAAABAE"
},

    
},{timestamps: true})

const User=mongoose.model("User",userSchema)

export default User;