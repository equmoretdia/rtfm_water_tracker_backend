import  express  from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authUserControllers.js";

import tokenAuth from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/logout",tokenAuth, logoutUser);







export default authRouter;