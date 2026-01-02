import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
    },role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},

  },
  { timestamps: true }
  
);

const User = mongoose.model("User", userSchema);
export default User;
