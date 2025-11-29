import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  date: String,
});

export const users = mongoose.model("user", userSchema);
