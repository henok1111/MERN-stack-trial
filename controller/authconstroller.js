import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidation, loginValidation } from "../validation/authvalidation.js"
export const register = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.details[0].message });

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age
    });

    res.status(201).json({ success: true, message: "User registered", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, "MY_SECRET_KEY", { expiresIn: "1h" });

    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
