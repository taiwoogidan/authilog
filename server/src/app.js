import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api", profileRoute);

export default app;
