import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../models/userSettingsModel.js";
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_JWT } = process.env;


export const registerUser = async (req, res, next) => {
    const { password, email } = req.body; 
    const normalizeEmail = email.toLowerCase();
    try {
        const user = await User.findOne({ email: normalizeEmail });
        if (user !== null) {
            return res.status(409).send({ massage: "Email in use" })
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const data = await User.create({
          password: passwordHash,
          email: normalizeEmail,
        });
        // console.log(data);
        res.status(201).send({massage: "Registration successfully"})

    } catch (error) {
        next(error)
 }
}

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (user===null) {
      throw HttpError(401, 'Email or password incorrect');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch===false) {
      throw HttpError(401, 'Email or password incorrect');
    }

    if (user.verify === false) {
      throw HttpError(401, "Your account is not verified");
    }

    const payload = {
      id: user._id,
      name: user.name,
    }

    const token = jwt.sign(payload, SECRET_JWT, { expiresIn: '90d' });
    const loginUser = await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: loginUser.email,
        subscription: loginUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}


export const logoutUser = async(req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();

  } catch (error) {
    next(error)
    }
}