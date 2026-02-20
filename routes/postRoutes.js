import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from "../controller/postController.js";

import { protect } from "../middleware/authMiddleware.js";
import { ownership } from "../middleware/ownership.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import Post from "../models/post.js";

const router = express.Router();

/* AUTH REQUIRED */
//router.use(protect);

/* ROUTES */

// Create
router.post("/", createPost);

// Read own posts
router.get("/", getPosts);

// Read one (ownership enforced)
router.get("/:id", ownership(Post, "user"), getPostById);

// Update (ownership enforced)
router.put("/:id", ownership(Post, "user"), updatePost);

// Delete (ownership + admin override)
router.delete("/:id", ownership(Post, "user"), authorizeRoles("admin"), deletePost);

export default router;