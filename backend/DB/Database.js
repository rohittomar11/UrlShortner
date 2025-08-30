import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rohittomar1974:rohittomar11@cluster0.1ijy9tc.mongodb.net/"
    );
    console.log("DB CONNECTION SUCCESSFUL");
  } catch (err) {
    console.log("db connection failed", err);
  }
};
