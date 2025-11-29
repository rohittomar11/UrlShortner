import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { users } from "../models/userSchema.js";

export const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password, date } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email already exists
    const existEmail = await users.findOne({ email });
    if (existEmail) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const user = new users({
      userId,
      name,
      email,
      password: hashPassword,
      date,
    });

    await user.save();
    console.log("User added successfully", user);

    return res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});
