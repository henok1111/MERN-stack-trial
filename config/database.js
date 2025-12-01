import mongoose from "mongoose";

export async function connectDB() {
  try {
    // Local MongoDB URI (default)
    await mongoose.connect("mongodb://127.0.0.1:27017/mydb");

    console.log("🔥 MongoDB Connected Successfully on part 20");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}
