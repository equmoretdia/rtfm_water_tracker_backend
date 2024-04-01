import { Water } from "../models/waterModel.js";
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newDose = await Water.create({ ...req.body, owner });
  res.status(201).json(newDose);
};

const update = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { id } = req.params;
  const updatedDose = await Water.findOneAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedDose) {
    throw HttpError(404);
  }

  res.json(updatedDose);
};

const del = async (req, res) => {
  const { id } = req.params;
  const removedDose = await Water.findOneAndDelete(id);
  if (!removedDose) {
    throw HttpError(404);
  }
  res.json(removedDose);
};

export const addWater = ctrlWrapper(add);
export const updateWater = ctrlWrapper(update);
export const deleteWater = ctrlWrapper(del);
