import User from "../models/User.js";
import argon2 from "argon2";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis.js";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API);
export const signup = async (req, res) => {
  try {
    let { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    fname = fname.trim();
    lname = lname.trim();
    email = email.trim().toLowerCase();
    password = password.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "Email already exist",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet requirement",
      });
    }
    const hashedPassword = await argon2.hash(password);
    const otp = crypto.randomInt(100000, 1000000).toString();
    await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
    });
    await redisClient.set(`emailVerification:${email}`, otp, { EX: 600 });
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify your Authilog email address",
      html: `<p>
        Hi ${fname}, <br> <br>
        Welcome to Authilog! 👋 <br> <br>
        Thanks for creating an account with us. Before you can start using Authilog, please verify your email address using the verification code below: <br>
        <h1>${otp}</h1>
        This code will expire in 10 minutes. <br> <br>
        For your security, please don't share this code with anyone. Authilog will never ask you to share your verification code. <br> <br>
        If you didn't create an Authilog account, you can safely ignore this email. <br> <br>
        Thanks, <br>
        The Authilog Team <br> <br>
        © 2026 Authilog. All rights reserved.
        </p>
      `,
    });
    res.status(201).json({
      success: true,
      email,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    email = email.trim().toLowerCase();
    password = password.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const verifyPassword = await argon2.verify(user.password, password);
    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!user.isVerified) {
      const otp = crypto.randomInt(100000, 1000000).toString();

      return res.status(400).json({
        success: false,
        message: `Your account isn't verified, We've sent a code to your email: ${email}`,
        user,
      });
    }
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    let { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    email = email.trim().toLowerCase();
    otp = otp.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email address",
      });
    }
    const storedOTP = await redisClient.get(`emailVerification:${email}`);
    if (!storedOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (otp !== storedOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    user.isVerified = true;
    await redisClient.del(`emailVerification:${email}`);
    await user.save();
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email address",
      });
    }
    email = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "If an account exists with this email, a reset code has been sent.",
      });
    }
    const otp = crypto.randomInt(100000, 1000000);
    await redisClient.set(`passwordReset:${email}`, otp, { EX: 600 });
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset your Authilog password",
      html: `
      <p>
        Hi ${user.fname}, <br><br>
        We received a request to reset the password for your Authilog account. <br><br>
        Your password reset code is:
        <h1>${otp}</h1>
        This code will expire in 10 minutes. <br><br>
        If you requested this password reset, enter the code on the Authilog password reset page to continue. <br><br>
        If you didn't request a password reset, you can safely ignore this email. Your password will not be changed unless someone successfully completes the reset process. <br><br>
        For your security, never share this code with anyone. <br><br>
        Best regards,<br>
        The Authilog Team<br><br>
        © ${new Date().getFullYear()} Authilog. All rights reserved.
      </p>
      `,
    });
    res.status(200).json({
      success: true,
      message: "OTP sent successfully, check your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    let { otp, email, password } = req.body;
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Please enter the 6-digit verification code.",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least ddd8 characters.",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
