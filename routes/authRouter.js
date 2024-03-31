import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authControllers.js";

import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authSchema } from "../models/usersModel.js";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), registerUser);

authRouter.post("/login", validateBody(authSchema), loginUser);

authRouter.post("/logout", authenticate, logoutUser);
