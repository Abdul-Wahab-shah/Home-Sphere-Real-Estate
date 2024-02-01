import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
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
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
