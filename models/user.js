import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be positive"],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
