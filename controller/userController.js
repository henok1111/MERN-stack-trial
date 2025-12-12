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
