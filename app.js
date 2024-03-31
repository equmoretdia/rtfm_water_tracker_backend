import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// import routes here:
// e.g. import { contactsRouter } from "./routes/contactsRouter.js";
import authRouter from "./routes/authRoutes.js";
import waterRateRouter from "./routes/waterRateRoutes.js";
import waterRouter from "./routes/waterRoutes.js";

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// mount route to path here:
// e.g. app.use("/api/contacts", contactsRouter);
app.use("/api/user", authRouter);
app.use('/api/user', waterRateRouter);
app.use("/api/water", waterRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
