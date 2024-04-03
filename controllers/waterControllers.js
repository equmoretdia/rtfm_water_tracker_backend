import { Water } from "../models/waterModel.js";
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

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

export const addWater = ctrlWrapper(add);
export const updateWater = ctrlWrapper(update);
export const deleteWater = ctrlWrapper(del);
