import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { ownership } from "../middleware/ownership.js";
import { createPost } from "../controller/postController.js";
import { getPostById } from "../controller/postController.js";
const postRoute = express.Router();

postRoute.post(
  "/",
  protect,          // authentication
  createPost        // business logic
);

postRoute.get(
  "/:id",
  protect,
  getPostById
);

export default postRoute;
