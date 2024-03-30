
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js";


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
    const { password, email } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        
const user = await User.findOne({ email: normalizedEmail });
if (user === null) {
  return res.status(401).send({ message: "Not authorized" });
}
const isMatch = await bcrypt.compare(password, user.password);
if (isMatch === false) {
  return res.status(401).send({ message: "Not authorized" });
}

        
       const token = jwt.sign(
         {
           id: user._id,
         },
         process.env.JWT_SECRET
        
      );
      await User.findByIdAndUpdate(user._id, { token });
      res.send({ token });
// console.log(res)
    } catch (error) {
        next(error)
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