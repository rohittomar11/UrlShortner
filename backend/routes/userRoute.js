import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

import { users } from "../models/userSchema.js";

export const userRoute = express.Router();
userRoute.post("/register", async (req, res) => {
  const { Name, Email, Date, Password } = req.body;
  const hashPassword = await bcrypt.hash(Password, 10);
  const existEmail = await users.findOne({ Email });
  if(existEmail){
    res.status(409).json({ message: "email already registered" });
  }
  const userId = uuidv4();

  const user = new users({userId ,  Name, Email, Date, Password: hashPassword });
  await user.save();
  console.log("user Added succesfully", user);

  res.status(200).json({ message: "User registered successfully" });
});
