import express from "express";
import {
  addWater,
  updateWater,
  deleteWater,
} from "../controllers/waterControllers.js";

import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import { isBodyEmpty } from "../middlewares/isBodyEmpty.js";
import { validateBody } from "../middlewares/validateBody.js";
import { addWaterSchema, updateWaterSchema } from "../models/waterModel.js";

export const waterRouter = express.Router();

waterRouter.post("/", authenticate, validateBody(addWaterSchema), addWater);

waterRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  isBodyEmpty,
  validateBody(updateWaterSchema),
  updateWater
);

waterRouter.delete("/:id", authenticate, isValidId, deleteWater);
