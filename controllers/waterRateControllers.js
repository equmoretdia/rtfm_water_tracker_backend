import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { User } from "../models/usersModel.js";
import { WaterRate } from "../models/waterRate.js";

const gcreateWaterRateArray = async (req, res) => {
  const { _id: owner } = req.user;

  const waterRateArray = await WaterRate.create({...req.body, owner})

  res.json(waterRateArray)

};

const updateWaterRate = async (req, res) => {
  const { id } = req.user;
  
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(400);
  }

  res.json(result);
};

export const controllers = {
  createWaterRateArray: ctrlWrapper(createWaterRateArray),
  updateWaterRate: ctrlWrapper(updateWaterRate),
};
