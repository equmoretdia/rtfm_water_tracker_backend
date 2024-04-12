import express from "express";
import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
} from "../controllers/authControllers.js";

import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authSchema, refreshSchema } from "../models/usersModel.js";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), registerUser);

authRouter.post("/login", validateBody(authSchema), loginUser);

authRouter.post("/refresh", validateBody(refreshSchema), refreshUser);

authRouter.post("/logout", authenticate, logoutUser);
