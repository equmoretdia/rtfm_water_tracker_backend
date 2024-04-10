import { Water } from "../models/waterModel.js";
import { WaterRate } from "../models/waterRateModel.js";
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  parseDate,
  getStartOfMonth,
  getEndOfMonth,
  getLastDayOfMonth,
  getMonthName,
  getDateRangeQuery,
} from "../helpers/dateUtils.js";

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newDose = await Water.create({ ...req.body, owner });

  res.status(201).json(newDose);
};

const update = async (req, res) => {
  const { id } = req.params;
  const updatedDose = await Water.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedDose) {
    throw HttpError(404);
  }

  res.json(updatedDose);
};

const del = async (req, res) => {
  const { id } = req.params;
  const removedDose = await Water.findByIdAndDelete(id);
  if (!removedDose) {
    throw HttpError(404);
  }

  res.json(removedDose);
};

const getToday = async (req, res) => {
  const { _id: owner } = req.user;
  const requestDate = new Date();
  const requestMonth = requestDate.getMonth() + 1;
  const requestYear = requestDate.getFullYear();

  const waterAmount = await Water.find({
    owner,
    date: getDateRangeQuery(requestDate),
  });

  const waterRateChanges = await WaterRate.find({
    owner,
    date: { $lte: requestDate },
  }).sort({ date: 1 });

  let currentWaterRate = 2000;

  for (let j = waterRateChanges.length - 1; j >= 0; j--) {
    const changeDate = new Date(waterRateChanges[j].date);
    const changeYear = changeDate.getUTCFullYear();
    const changeMonth = changeDate.getUTCMonth() + 1;
    const changeDay = changeDate.getUTCDate();

    if (
      changeYear < requestYear ||
      (changeYear === requestYear && changeMonth < requestMonth) ||
      (changeYear === requestYear &&
        changeMonth === requestMonth &&
        changeDay <= requestDate)
    ) {
      currentWaterRate = waterRateChanges[j].waterRate;
      break;
    }
  }

  const sumAmount = waterAmount.reduce((total, arr) => total + arr.amount, 0);
  const waterPercent = Math.round((sumAmount / currentWaterRate) * 100);

  const waterRecords = waterAmount.map((record) => ({
    id: record._id,
    consumedWater: record.amount,
    date: record.date,
  }));

  const result = { waterPercent, waterRecords };

  res.json(result);
};

const getMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;

  const requestDate = parseDate(date);
  const requestMonth = requestDate.getMonth() + 1;
  const requestYear = requestDate.getFullYear();

  const startDate = getStartOfMonth(requestYear, requestMonth);
  const endDate = getEndOfMonth(requestYear, requestMonth);

  const waterRateChanges = await WaterRate.find({
    owner,
    date: { $lte: endDate },
  }).sort({ date: 1 });

  const waterMonth = await Water.find({
    owner,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const waterInfoForMonth = [];
  let currentWaterRate = 2000;

  for (let i = 1; i <= getLastDayOfMonth(requestYear, requestMonth); i++) {
    const day = i;

    for (let j = waterRateChanges.length - 1; j >= 0; j--) {
      const changeDate = new Date(waterRateChanges[j].date);
      const changeYear = changeDate.getUTCFullYear();
      const changeMonth = changeDate.getUTCMonth() + 1;
      const changeDay = changeDate.getUTCDate();

      if (
        changeYear < requestYear ||
        (changeYear === requestYear && changeMonth < requestMonth) ||
        (changeYear === requestYear &&
          changeMonth === requestMonth &&
          changeDay <= day)
      ) {
        currentWaterRate = waterRateChanges[j].waterRate;
        break;
      }
    }

    const waterIntakeForDay = waterMonth.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getUTCDate() === day;
    });

    const totalWaterIntakeForDay = waterIntakeForDay.reduce(
      (total, record) => total + record.amount,
      0
    );

    const percentage = currentWaterRate
      ? Math.round((totalWaterIntakeForDay / currentWaterRate) * 100)
      : 0;

    const waterInfo = {
      date: `${day}, ${getMonthName(requestMonth)}`,
      waterRate: currentWaterRate,
      percentage: percentage,
      totalIntake: waterIntakeForDay.length,
    };

    waterInfoForMonth.push(waterInfo);
  }

  res.json({ waterInfoForMonth });
};

export const addWater = ctrlWrapper(add);
export const updateWater = ctrlWrapper(update);
export const deleteWater = ctrlWrapper(del);
export const getWaterToday = ctrlWrapper(getToday);
export const getWaterMonth = ctrlWrapper(getMonth);
