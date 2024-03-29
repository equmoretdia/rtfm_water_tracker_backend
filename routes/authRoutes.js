import  express  from "express";
import { registerUser } from "../controllers/authUserControllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);


export default authRouter;