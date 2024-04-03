import { HttpError } from "./../helpers/HttpError.js";

export const isBodyEmpty = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, "Body must have at least one field"));
  }
  next();
};
