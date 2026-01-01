import User from '../models/user.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const getuserbyid = async (req, res) => {
  try {
const user = await User.findById(req.params.id).select("-password");


    // 2. Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 3. Success response
    res.status(200).json({
      success: true,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    // 4. Improved error handling
    console.error("Error fetching user:", error);
    
    res.status(400).json({
      success: false,
      message: error.message || "Invalid ID format or Server Error"
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}