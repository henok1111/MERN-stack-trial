

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/userRouter.js'
import markRouter from './routes/markRouter.js';
const app = express();
import dotenv from "dotenv";
import registerRouter from './routes/authroute.js';
import 'dotenv/config';
import statusroute from './routes/status.js';
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());
// Database connection
connectDB();
// Routes
app.use('/api/users', router);
app.use('/api',markRouter)
app.use("/api/auth", registerRouter);
app.use('/api',statusroute)
// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("REFRESH_SECRET:", process.env.REFRESH_SECRET);
