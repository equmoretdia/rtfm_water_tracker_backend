import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { authRouter } from "./routes/authRouter.js";
import waterRateRouter from "./routes/waterRateRoutes.js";
import { waterRouter } from "./routes/waterRouter.js";
import userSettingsRoutes from "./routes/userSettingsRoutes.js";

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/user", waterRateRouter);
app.use("/api/water", waterRouter);
app.use("/api/user-settings", userSettingsRoutes);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
