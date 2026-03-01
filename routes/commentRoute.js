import express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
} from "../controller/comment.js";

import { protect } from "../middleware/authMiddleware.js";
import { ownership } from "../middleware/ownership.js";
import { authorize } from "../middleware/authorize.js";
import Comment from "../models/comment.js";

const commentRoute = express.Router({ mergeParams: true });

/* 🔐 Create comment */
commentRoute.post(
  "/",
  protect,
  authorize("user", "admin"),
  createComment
);

/* 📖 Read comments for post (public) */
commentRoute.get("/", getCommentsByPost);

/* ✏️ Update comment */
commentRoute.put(
  "/:id",
  protect,
  authorize("user", "admin"),
  ownership(Comment, "user"),
  updateComment
);

/* 🗑 Delete comment */
commentRoute.delete(
  "/:id",
  protect,
  authorize("user", "admin"),
  ownership(Comment, "user"),
  deleteComment
);

export default commentRoute;
