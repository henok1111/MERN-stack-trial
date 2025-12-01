import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
app.use(express.json());

// Connect to database
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Server & MongoDB working!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
