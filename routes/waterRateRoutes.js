import express from "express";
import { validateBody } from "../middlewares/validateBody";
import { waterRateSchema } from "../models/userModels";
import { controllers } from "../controllers/waterRateControllers";

const waterRouter = express.Router();

waterRouter.patch('/waterRate', authenticate, validateBody(waterRateSchema), controllers.updateWaterRate);

export default waterRouter;