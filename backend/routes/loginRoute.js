import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../models/userSchema.js";

export const loginRoute = express.Router();

loginRoute.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  console.log("Incoming login:", Email, Password);

  try {
    const existEmail = await users.findOne({ Email: Email.trim().toLowerCase() });
    if (!existEmail) {
      return res.status(400).json({ message: "Email not exists" });
    }

    const isValidPassword = await bcrypt.compare(Password, existEmail.Password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Email & Password" });
    }

    const token = jwt.sign(
      { userId: existEmail.userId, email: existEmail.Email },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    
    return res.status(500).json({ message: "Something went wrong" });
  }
});

