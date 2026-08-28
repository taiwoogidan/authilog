import express from "express";
import { profile } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/profile", authMiddleware, profile);

export default router;
