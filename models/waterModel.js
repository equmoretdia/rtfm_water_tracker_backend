import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const waterSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [1, "Minimum amount of water is 1ml"],
      max: [5000, "Maximum amount of water is 5000ml"],
    },
    date: {
      type: Date,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

waterSchema.post("save", handleMongooseError);

export const Water = model("water", waterSchema);

export const addWaterSchema = Joi.object({
  amount: Joi.number().required().min(1).max(5000),
  date: Joi.date().required().iso(),
});

export const updateWaterSchema = Joi.object({
  amount: Joi.number().min(1).max(5000),
  date: Joi.date().iso(),
});
