import express from "express";
import {
  forgetPassword,
  resetPassword,
  signin,
  signOut,
  signup,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgetPassword);
router.patch("/reset-password", resetPassword);
router.post("/sign-out", signOut);

export default router;
