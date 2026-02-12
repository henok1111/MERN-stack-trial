import express from "express";
import { register, login, refresh, logout } from "../controllers/authController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

/* protected test route */
router.get("/me", protect, (req,res)=>{
  res.json({ success:true, user:req.user });
});

export default router;
