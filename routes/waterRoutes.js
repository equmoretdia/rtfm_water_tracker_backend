import express from "express";
import {
  addWater,
  updateWater,
  deleteWater,
} from "../controllers/waterControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const waterRouter = express.Router();

waterRouter.post("/add", authenticate, addWater);

waterRouter.patch("/update/:id", authenticate, updateWater);

waterRouter.delete("/delete/:id", authenticate, deleteWater);

export default waterRouter;
