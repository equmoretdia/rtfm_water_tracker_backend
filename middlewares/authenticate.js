import jwt from 'jsonwebtoken';
import User from './../models/userSettingsModel.js';
import { configDotenv } from 'dotenv';

configDotenv();

const { SECRET_JWT } = process.env;

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: "Not authorized" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decode = jwt.verify(token, SECRET_JWT);
    const user = await User.findById( decode.id );
    if (!user || !user.token || user.token !== token) {
      return res.status(401).send({ message: "Not authorized" });
    }

    req.user = user;

    next();
  } catch (error) {
      next(error);
  }
};
export default authenticate;