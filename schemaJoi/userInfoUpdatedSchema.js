import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const gender = ["male", "female"];

export const userInfoUpdatedSchema = Joi.object({
  name: Joi.string().max(32),
  email: Joi.string().pattern(emailRegexp).required(),
  outdatedPassword: Joi.string().min(8).max(64),
  newPassword: Joi.string().min(8).max(64),
  gender: Joi.string().valid(...gender),
});