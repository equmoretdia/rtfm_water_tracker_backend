import express from "express";
import { getWaterToday } from "../controllers/waterStatController.js";
import { authenticate } from "../middlewares/authenticate.js";

export const waterStatRouter = express.Router();

waterStatRouter.get(
  "/today",
  authenticate,
  getWaterToday
);