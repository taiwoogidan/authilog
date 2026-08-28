import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    // Get the access token from the HTTP-only cookie
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Verify the access token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    // Attach authenticated user to the request
    req.user = user;

    // Continue to the protected route
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    // JWT-specific errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token.",
      });
    }

    // Other server/database errors
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
