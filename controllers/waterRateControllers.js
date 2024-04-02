import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { WaterRate } from "../models/waterRate.js";

const updateWaterRate = async (req, res) => {

  const { _id: owner } = req.user;

  const result = await WaterRate.findOneAndUpdate({owner}, req.body, { new: true });

  if (!result) {
    throw HttpError(400);
  }

  res.json(result);
};

export const controllers = {
  updateWaterRate: ctrlWrapper(updateWaterRate),
};
