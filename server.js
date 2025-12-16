import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/userRouter.js'
import markRouter from './routes/markRouter.js';
const app = express();
import dotenv from "dotenv";
import authRoutes from "./routes/authroute.js"
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());


// Database connection
connectDB();
// Routes
app.use('/api/users', router);
     
app.use('/api',markRouter)
app.use("/api/auth", authRoutes);
// Start server

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
