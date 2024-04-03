import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { authRouter } from "./routes/authRouter.js";
import { waterRateRouter } from "./routes/waterRateRouter.js";
import { waterRouter } from "./routes/waterRouter.js";
import { userSettingsRouter } from "./routes/userSettingsRouter.js";

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/water-rate", waterRateRouter);
app.use("/api/water", waterRouter);
app.use("/api/user-settings", userSettingsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
