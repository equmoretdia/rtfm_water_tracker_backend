import { model, Schema } from "mongoose";
import { emailRegexp } from "./../schemaJoi/userInfoUpdatedSchema.js";

const userSettingsModel = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
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

const User = model("user", userSettingsModel);
export default User;