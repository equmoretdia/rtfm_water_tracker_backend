import bcrypt from "bcryptjs";
import { User } from "../models/usersModel.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

const get = async (req, res) => {
  const { name, email, gender, avatarURL } = req.user;
  res.json({ name, email, gender, avatarURL });
};

const updateSettings = async (req, res) => {
  const { outdatedPassword, newPassword, newEmail } = req.body;
  const { _id, currentEmail, password } = req.user;

  let hashedNewPassword;
  let avatarURL;

  if (req.file) {
    avatarURL = req.file.path;
  } else {
    const keys = Object.keys(req.body);
    if (!keys.length) {
      throw HttpError(400, "Body must have at least one field");
    }
  }

  if (outdatedPassword && newPassword) {
    if (outdatedPassword === newPassword) {
      throw HttpError(
        400,
        "The new password must be different from the old one"
      );
    }

    const comparedPassword = await bcrypt.compare(outdatedPassword, password);

    if (!comparedPassword) {
      throw HttpError(401, "Current password is incorrect");
    }

    hashedNewPassword = await bcrypt.hash(newPassword, 10);
  } else if (newPassword) {
    throw HttpError(
      400,
      "To change the password, provide both outdatedPassword and newPassword"
    );
  }

  if (newEmail && newEmail !== currentEmail) {
    const userWithNewEmail = await User.findOne({ email: newEmail });

    if (userWithNewEmail) {
      throw HttpError(409, "Email is already in use");
    }
  }

  const updatedUserData = { ...req.body };
  if (hashedNewPassword) {
    updatedUserData.password = hashedNewPassword;
  }
  if (avatarURL) {
    updatedUserData.avatarURL = avatarURL;
  }

  const updatedUser = await User.findByIdAndUpdate(_id, updatedUserData, {
    new: true,
  });

  const { name = "", gender, email } = updatedUser;
  res.status(200).json({ email, name, gender, avatarURL });
};

export const getCurrentUser = ctrlWrapper(get);
export const updateUserSettings = ctrlWrapper(updateSettings);
