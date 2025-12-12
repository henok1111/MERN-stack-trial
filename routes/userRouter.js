import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import validate from "../middleware/validate.js";
import { createUserSchema, updateUserSchema } from "../validation/userValidation.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", validate(createUserSchema), createUser);
router.put("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
