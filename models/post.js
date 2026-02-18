import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    // 🔗 Ownership link
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // reference User collection
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
