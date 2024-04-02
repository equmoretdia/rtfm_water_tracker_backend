import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { waterRateSchema } from "../models/usersModel.js";
import { controllers } from "../controllers/waterRateControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

export const waterRateRouter = express.Router();

// waterRateRouter.post(
//   "/water-rate", 
//   authenticate,
//   validateBody(waterRateSchema), 
//   controllers.createWaterRateArray
// )

waterRateRouter.patch(
  "/water-rate",
  authenticate,
  validateBody(waterRateSchema),
  controllers.updateWaterRate
);
