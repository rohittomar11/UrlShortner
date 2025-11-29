import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../models/userSchema.js";

export const loginRoute = express.Router();

loginRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Incoming login:", email, password);

  try {
    // check email exists
    const existEmail = await users.findOne({ email: email.trim().toLowerCase() });
    if (!existEmail) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    // compare password
    const isValidPassword = await bcrypt.compare(password, existEmail.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // generate token
    const token = jwt.sign(
      { userId: existEmail.userId, email: existEmail.email },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
