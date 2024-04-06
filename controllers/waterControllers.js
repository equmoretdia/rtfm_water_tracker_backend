import { Water } from "../models/waterModel.js";
import { WaterRate } from "../models/waterRateModel.js";
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  parseDate,
  getStartOfMonth,
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

const getMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;

  const requestDate = parseDate(date);
  const requestMonth = requestDate.getMonth() + 1;
  const requestYear = requestDate.getFullYear();

  const waterRatesMonth = await WaterRate.find({
    owner,
    date: {
      $gte: getStartOfMonth(requestYear, requestMonth),
      $lt: getStartOfMonth(requestYear, requestMonth + 1),
    },
  });

  const waterMonth = await Water.find({
    owner,
    date: {
      $gte: getStartOfMonth(requestYear, requestMonth),
      $lt: getStartOfMonth(requestYear, requestMonth + 1),
    },
  });

  const waterInfoForMonth = [];

  for (let i = 1; i <= getLastDayOfMonth(requestYear, requestMonth); i++) {
    const day = i;

    const waterRateForDay = waterRatesMonth.find(
      (record) => new Date(record.date).getDate() === day
    );

    const waterIntakeForDay = waterMonth.filter(
      (record) => new Date(record.date).getDate() === day
    );

    const totalWaterIntakeForDay = waterIntakeForDay.reduce(
      (total, record) => total + record.amount,
      0
    );

    let percentage = 0;
    if (waterRateForDay) {
      percentage = (totalWaterIntakeForDay / waterRateForDay.waterRate) * 100;
    }

    const waterInfo = {
      date: `${day}, ${getMonthName(requestMonth)}`,
      waterRate: waterRateForDay ? waterRateForDay.waterRate : 0,
      percentage: percentage.toFixed(2),
      totalIntake: waterIntakeForDay.length,
    };

    waterInfoForMonth.push(waterInfo);
  }

  res.json({ waterInfoForMonth });
};
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


export const addWater = ctrlWrapper(add);
export const updateWater = ctrlWrapper(update);
export const deleteWater = ctrlWrapper(del);
export const getWaterMonth = ctrlWrapper(getMonth);
export const getWaterToday = ctrlWrapper(getToday);
