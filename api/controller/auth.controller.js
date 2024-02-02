import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
// import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    // Hash the password before saving it to the database
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new User instance with hashed password
    const newUser = new User({ username, email, password: hashPassword });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
};
