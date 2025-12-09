import mongoose from 'mongoose';

// this function connects our node project to mongodb
// Inside connectDB in database.js
export async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mydb'); // Clean, modern syntax

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}


