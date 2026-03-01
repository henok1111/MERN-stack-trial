import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,getAllPostsPublicly
} from "../controller/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import { ownership } from "../middleware/ownership.js";
import Post from "../models/post.js";

const router = express.Router();

/* --- PUBLIC ROUTES (No Protection) --- */

// Read all (Anyone can see - but you need a new public controller for this)
router.get("/all", getAllPostsPublicly);

// Read one (Anyone can see)
router.get("/:id", getPostById); 

/* --- PROTECTED ROUTES (Login Required) --- */
router.use(protect); // Anything below here needs a token

// Create a post
router.post("/", createPost);

// Read own posts
router.get("/", getPosts);

// Update (Owner/Admin only - using your smart middleware)
router.put("/:id", ownership(Post, "user"), updatePost);

// Delete (Owner/Admin only - using your smart middleware)
router.delete("/:id", ownership(Post, "user"), deletePost);

export default router;
