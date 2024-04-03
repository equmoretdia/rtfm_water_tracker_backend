import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { updateWaterRateSchema } from "../models/waterRateModel.js";
import { updateWaterRate } from "../controllers/waterRateControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

export const waterRateRouter = express.Router();

waterRateRouter.patch(
  "/",
  authenticate,
  validateBody(updateWaterRateSchema),
  updateWaterRate
);
