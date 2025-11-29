import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log("DB CONNECTION SUCCESSFUL");
  } catch (err) {
    console.log("db connection failed", err);
  }
};
