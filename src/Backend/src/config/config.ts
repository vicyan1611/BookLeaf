import mongoose from "mongoose";
require("dotenv").config();

const MONGODB_URI = "mongodb://localhost:27017/bookleaf";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};