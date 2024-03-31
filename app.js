import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userSettingsRoutes from "./routes/userSettingsRoutes.js";
import mongoose from 'mongoose';

dotenv.config();

mongoose.set('strictQuery', false);

// import routes here:
// e.g. import { contactsRouter } from "./routes/contactsRouter.js";

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// mount route to path here:
// e.g. app.use("/api/contacts", contactsRouter);

app.use("/api/user", authRouter);
app.use("/api/user-settings", userSettingsRoutes);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
