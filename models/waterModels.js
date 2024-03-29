import { Schema, model } from "mongoose";
import Joi from "joi";

const waterSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: [1, "Minimum amount of water is 1ml"],
    max: [5000, "Maximum amount of water is 5000ml"],
  },
  time: {
    type: Date,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

export default model("Water", waterSchema);

export const addWaterSchema = Joi.object({
  amount: Joi.number().required().min(1).max(5000),
  time: Joi.date().required().iso(),
  owner: Joi.string().required(),
});

export const updateWaterSchema = Joi.object({
  amount: Joi.number().min(1).max(5000),
  time: Joi.date().required().iso(),
  owner: Joi.string().required(),
});
