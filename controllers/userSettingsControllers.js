import bcrypt from "bcryptjs";
import { User } from "../models/usersModel.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

const get = async (req, res) => {
  const { name, email, gender, avatarURL } = req.user;
  res.json({ name, email, gender, avatarURL });
};

const updateInfo = async (req, res) => {
  const { outdatedPassword, newPassword, newEmail } = req.body;
  const { _id, currentEmail } = req.user;

  let hashedNewPassword;

  if (outdatedPassword && newPassword) {
    const user = await User.findById(_id);
    if (!user) {
      throw HttpError(404, "User not found");
    }

    const { password } = user;

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

  const updatedUser = await User.findByIdAndUpdate(_id, updatedUserData, {
    new: true,
  });

  const { name = "", gender, email } = updatedUser;
  res.status(200).json({ email, name, gender });
};

const avatar = async (req, res) => {
  const { path } = req.file;
  const { _id, avatarURL } = req.user;

  if (!req.file) {
    throw HttpError(400, "File not found");
  }

  await User.findByIdAndUpdate(_id, { avatarURL: path });
  res.status(200).json({
    avatarURL: path,
  });
};

export const updateUserAvatar = ctrlWrapper(avatar);
export const getCurrentUser = ctrlWrapper(get);
export const updateUserInfo = ctrlWrapper(updateInfo);
