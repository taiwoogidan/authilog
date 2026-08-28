import express from "express";
import {
  forgetPassword,
  resetPassword,
  signin,
  signup,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
