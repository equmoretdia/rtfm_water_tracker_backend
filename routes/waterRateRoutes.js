import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { waterRateSchema } from "../models/userModels.js";
import { controllers } from "../controllers/waterRateControllers.js";
import tokenAuth from "../middlewares/authenticate.js";

const waterRateRouter = express.Router();

waterRateRouter.patch('/water-rate', tokenAuth, validateBody(waterRateSchema), controllers.updateWaterRate);

export default waterRateRouter;