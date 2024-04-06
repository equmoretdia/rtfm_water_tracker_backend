import { getDateRangeQuery } from "../helpers/dateUtils.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { WaterRate } from "../models/waterRateModel.js";
import { Water } from "../models/waterModel.js";

const getToday = async (req, res) => {
  const { _id: owner } = req.user;
  const requestDate = new Date();
  const dateRangeQuery = getDateRangeQuery(requestDate);

  const { waterRate } = await WaterRate.findOne({
    owner,
    date: dateRangeQuery,
  });
  const waterAmount = await Water.find({
    owner,
    date: dateRangeQuery,
  });
  const sumAmount = waterAmount.reduce((total, arr) => total + arr.amount, 0);
  const listAmount = waterAmount.map((arr) => arr.amount);
  const waterPercent = Math.round((sumAmount  / waterRate) * 100);
  const result = { waterPercent, listAmount };

  res.json(result);
};

export const getWaterToday = ctrlWrapper(getToday);