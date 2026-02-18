import Post from "../models/post.js";

/**
 * Create post
 */
export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      // 🔐 ownership assignment
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
     post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔐 ownership check
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Not your post"
      });
    }

    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
