import  express  from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authUserControllers.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", authenticate , logoutUser);



export default authRouter;