import { parseDate, getDateRangeQuery } from "../helpers/dateUtils.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { WaterRate } from "../models/waterRateModel.js";

const update = async (req, res) => {
  const { _id: owner } = req.user;
  const { waterRate, date } = req.body;

  const requestDate = date ? parseDate(date) : new Date();
  const dateRangeQuery = getDateRangeQuery(requestDate);

  let result = await WaterRate.findOne({
    owner,
    date: dateRangeQuery,
  });

  if (result) {
    await WaterRate.findOneAndUpdate(
      { owner, date: dateRangeQuery },
      { waterRate, date },
      {
        new: true,
      }
    );
  } else {
    await WaterRate.create({ ...req.body, owner });
  }
  const allResults = await WaterRate.find({ owner });

  res.json(allResults);
};

export const updateWaterRate = ctrlWrapper(update);
