// import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { WaterRate } from "../models/waterRateModel.js";

const update = async (req, res) => {
  const { _id: owner } = req.user;
  const { waterRate, date } = req.body;

  const requestDate = new Date(date);
  const requestDateUTC = new Date(
    Date.UTC(
      requestDate.getUTCFullYear(),
      requestDate.getUTCMonth(),
      requestDate.getUTCDate()
    )
  );

  const startOfDayUTC = new Date(requestDateUTC);
  const endOfDayUTC = new Date(requestDateUTC);
  endOfDayUTC.setUTCDate(endOfDayUTC.getUTCDate() + 1);

  const dateRangeQuery = {
    $gte: startOfDayUTC,
    $lt: endOfDayUTC,
  };

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
