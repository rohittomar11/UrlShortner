import mongoose from "mongoose";
const loginSchema = new mongoose.Schema({
  Email: String,
  Password: String,
});

export const login = mongoose.model("login", loginSchema);
