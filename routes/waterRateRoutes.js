import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { waterRateSchema } from "../models/usersModel.js";
import { controllers } from "../controllers/waterRateControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const waterRateRouter = express.Router();

waterRateRouter.patch(
  "/water-rate",
  authenticate,
  validateBody(waterRateSchema),
  controllers.updateWaterRate
);

export default waterRateRouter;
