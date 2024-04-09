import express from "express";

import {
  getCurrentUser,
  updateUserSettings,
} from "../controllers/userSettingsControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import { validateBody } from "../middlewares/validateBody.js";
import { userInfoUpdatedSchema } from "../models/usersModel.js";

export const userSettingsRouter = express.Router();

userSettingsRouter.get("/current", authenticate, getCurrentUser);

userSettingsRouter.patch(
  "/edit",
  authenticate,
  upload.single("avatar"),
  validateBody(userInfoUpdatedSchema),
  updateUserSettings
);
