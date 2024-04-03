import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const waterRateSchema = new Schema(
  {
    waterRate: {
      type: Number,
      default: 2000,
      max: [15000, "Maximum amount of your daily normal is 15L"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

waterRateSchema.post("save", handleMongooseError);

export const WaterRate = model("water_rate", waterRateSchema);

export const updateWaterRateSchema = Joi.object({
  waterRate: Joi.number().min(1).max(15000).required(),
  date: Joi.date().iso(),
});
