import express from "express";

import userSettingsController from "../controllers/userSettingsController.js";

import authenticate from '../middlewares/authenticate.js';
import isBodyEmpty from '../middlewares/isBodyEmpty.js';
import upload from '../middlewares/upload.js';


import { validateBody } from "./../middlewares/validateBody.js";

import { userInfoUpdatedSchema } from "./../schemaJoi/userInfoUpdatedSchema.js";

const userSettingsRoutes = express.Router();

userSettingsRoutes.get("/current", authenticate, userSettingsController.getCurrentUser);

userSettingsRoutes.patch("/edit", authenticate, isBodyEmpty,  validateBody(userInfoUpdatedSchema), userSettingsController.updateUserInfo);

userSettingsRoutes.patch("/avatar", authenticate, upload.single("avatar"), userSettingsController.avatar);

userSettingsRoutes.delete("/delete", authenticate, userSettingsController.deleteUserAndData);

export default userSettingsRoutes;