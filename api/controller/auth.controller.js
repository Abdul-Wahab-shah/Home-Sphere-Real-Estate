import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
// import { errorHandler } from '../utils/error.js';
// import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
console.error("Error during signup:", error);
    next(error);
  }
};