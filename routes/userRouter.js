import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getuserbyid
} from "../controller/userController.js";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile } from "../controller/userController.js";
import { authorize } from "../middleware/authorize.js";
import { createUserSchema, updateUserSchema } from "../validation/userValidation.js";
const router = express.Router();
router.get("/user",protect, authorize("admin"), getUsers);
router.get("/profile",protect, getProfile);     
router.post("/", validate(createUserSchema), createUser);
router.put("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id",protect,getuserbyid)
export default router;
