import express from "express";
import { validateBody } from "../middlewares/validateBody";
import { waterRateSchema } from "../models/userModels";
import { controllers } from "../controllers/waterRateControllers";

const waterRateRouter = express.Router();

waterRateRouter.patch('/water-rate', authenticate, validateBody(waterRateSchema), controllers.updateWaterRate);

export default waterRouter;