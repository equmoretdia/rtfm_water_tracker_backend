import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { getWaterToday } from "../controllers/waterStatController.js";
import { updateWaterRate } from "../controllers/waterRateControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

export const waterStatRouter = express.Router();

waterStatRouter.get(
  "/today",
  authenticate,
  getWaterToday
);
waterStatRouter.get(
    "/month",
    authenticate,
    updateWaterRate
  );
