import Comment from "../models/comment.js";
import Post from "../models/post.js";

/* 🔐 Create comment */
export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required"
      });
    }

    // Check parent post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const comment = await Comment.create({
      content,
      post: postId,
      user: req.user.id   // 🔐 ownership from token
    });

    res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* 📖 Read comments for a post (public) */
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "postId is required in URL"
      });
    }

    const comments = await Comment.find({ post: postId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ✏️ Update comment (owner only) */
export const updateComment = async (req, res) => {
  try {
    const comment = req.resource; // from ownership middleware

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.json({
      success: true,
      comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* 🗑 Delete comment (owner/admin) */
export const deleteComment = async (req, res) => {
  try {
    const comment = req.resource;

    await comment.deleteOne();

    res.json({
      success: true,
      message: "Comment deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
