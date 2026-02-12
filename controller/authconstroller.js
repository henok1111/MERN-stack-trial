import User from "../models/User.js";
import RefreshToken from "../models/refreshToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* helpers */
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message:"Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, age, email, password: hashed
    });

    res.status(201).json({ success:true, user });
  } catch (e) {
    res.status(500).json({ success:false, message:e.message });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message:"Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message:"Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7*24*60*60*1000)
    });

    res.json({
      success:true,
      accessToken,
      refreshToken
    });
  } catch (e) {
    res.status(500).json({ success:false, message:e.message });
  }
};

/* REFRESH */
export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message:"No refresh token" });

    const stored = await RefreshToken.findOne({ token: refreshToken });
    if (!stored) return res.status(403).json({ message:"Invalid refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (e) {
    res.status(403).json({ message:"Refresh failed" });
  }
};

/* LOGOUT */
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await RefreshToken.deleteOne({ token: refreshToken });

    res.json({ success:true, message:"Logged out" });
  } catch (e) {
    res.status(500).json({ success:false, message:e.message });
  }
};
