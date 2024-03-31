import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import User from "../models/userModels.js";

const updateWaterRate = async (req, res) => { 
    const {id} = req.user;

    const result = await User.findByIdAndUpdate(id, req.body, {new: true});
    if (!result){
        throw HttpError(400)
    };

    res.json(result)
}

export const controllers = {
    updateWaterRate: ctrlWrapper(updateWaterRate)
}