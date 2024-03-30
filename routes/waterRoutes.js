import express from "express";
import {
  addWater,
  updateWater,
  deleteWater,
} from "../controllers/waterControllers.js";

const waterRouter = express.Router();

waterRouter.post("/add", addWater);

waterRouter.param("/update", updateWater);

waterRouter.delete("/delete", deleteWater);

export default waterRouter;
