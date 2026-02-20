import Post from "../models/Post.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id   // 🔑 ownership binding
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

/* READ ALL (only own data) */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });

    res.json({
      success: true,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* READ ONE */
export const getPostById = async (req, res) => {
  try {
    res.json({
      success: true,
      post: req.resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* UPDATE */
export const updatePost = async (req, res) => {
  try {
    const post = req.resource;

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();

    res.json({
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

/* DELETE */
export const deletePost = async (req, res) => {
  try {
    await req.resource.deleteOne();

    res.json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};