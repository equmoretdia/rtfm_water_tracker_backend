import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/usersModel.js";
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const register = async (req, res) => {
  const { password, email } = req.body;
  const normalizeEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizeEmail });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({
    password: passwordHash,
    email: normalizeEmail,
  });
  res.status(201).json({ massage: "Registration successful" });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).end();
};

export const registerUser = ctrlWrapper(register);
export const loginUser = ctrlWrapper(login);
export const logoutUser = ctrlWrapper(logout);
