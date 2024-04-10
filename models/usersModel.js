import Joi from "joi";
import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
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
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "Email must be a string.",
    "any.required": "Email field is required.",
    "string.empty": "Email must not be empty.",
    "string.pattern.base": "Email must be in the format 'example@example.com'.",
  }),
  password: Joi.string().min(8).max(64).required(),
});

export const userInfoUpdatedSchema = Joi.object({
  name: Joi.string().max(32),
  email: Joi.string().pattern(emailRegexp).messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email must not be empty.",
    "string.pattern.base": "Email must be in the format 'example@example.com'.",
  }),
  outdatedPassword: Joi.string().min(8).max(64),
  newPassword: Joi.string().min(8).max(64),
  gender: Joi.string().valid("male", "female").messages({
    "any.only": "Gender must be either 'male' or 'female'.",
  }),
});
