import Joi from "joi";
import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const gender = ["male", "female"];

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 64,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "female",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    waterRate: {
      type: Number,
      default: 2,
      max: [15, "Maximum amount of your daily normal is 15L"],
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const waterRateSchema = Joi.object({
  waterRate: Joi.number().max(15).required(),
});

export const userInfoUpdatedSchema = Joi.object({
  name: Joi.string().max(32),
  email: Joi.string().pattern(emailRegexp).required(),
  outdatedPassword: Joi.string().min(8).max(64),
  newPassword: Joi.string().min(8).max(64),
  gender: Joi.string().valid(...gender),
});