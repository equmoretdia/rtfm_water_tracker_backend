import Water, {
  addWaterSchema,
  updateWaterSchema,
} from "../models/waterModels";
import HttpError from "../helpers/HttpError.js";

export const addWater = async (req, res, next) => {
  try {
    const newDose = {
      amount: req.body.amount,
      time: req.body.time,
      owner: req.user.owner,
    };
    const { error } = addWaterSchema.validate(newDose);

    if (typeof error !== "undefined") {
      next(HttpError(400, error.message));
    }
    const result = await Water.create(newDose);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateWater = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedDose = {
      amount: req.body.amount,
      time: req.body.time,
    };

    if (!updatedDose.amount && !updatedDose.time) {
      next(HttpError(400, "Body must have at least one field"));
    }

    const { error } = updateWaterSchema.validate(updatedDose);
    if (typeof error !== "undefined") {
      next(HttpError(400, error.message));
    }

    const result = await Water.findOneAndUpdate({ _id: id }, updatedDose, {
      new: true,
    });

    if (result === null) {
      next(HttpError(404));
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteWater = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Water.findOneAndDelete({ _id: id });

    if (contact === null) {
      next(HttpError(404));
      return;
    }

    res.status(200).send(contact);
  } catch (error) {
    next(error).json({ message: "Server error" });
  }
};
