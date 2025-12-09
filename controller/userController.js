import User from '../models/user.js';

// CREATE USER
export const createUser = async (req, res) => {
    try {
        const { name, age } = req.body;

        const user = await User.create({ name, age });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ONE USER
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: "User Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
