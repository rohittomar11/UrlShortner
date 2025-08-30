import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userId : String,
  Name: String,
  Email: String,
  Password: String,
  Date: String,
});

export const users = mongoose.model("user", userSchema);
