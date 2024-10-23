import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";

// @desc Register a new user
// @route POST api/user/register
// @access public
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are filled
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
