import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

export function tokenAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [Bearer, token] = authHeader.split(" ", 2);
  if (Bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Not authorized" });
      }
      return res.status(401).send({ message: "Not authorized" });
    }

    const user = await User.findById(decode.id);
    if (user === null) {
      return res.status(401).send({ message: "Not authorized" });
    }
    if (user.token !== token) {
      return res.status(401).send({ message: "Not authorized" });
    }
    req.user = {
      _id: user.id,
      email: user.email,
      token: user.token,
    };

    next();
  });
}

export default tokenAuth;
