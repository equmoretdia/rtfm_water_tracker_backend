import { HttpError } from "../helpers/HttpError";
import { ctrlWrapper } from "../helpers/ctrlWrapper";
import userModels from "../models/userModels";

const updateWaterRate = async (req, res) => { 
    const {id} = req.user;

    const result = await User.findByIdAndUpdate(id, req.body, {new: true});
    if (!result){
        throw HttpError(400)
    };

    res.json(result)
}

export const controllers = {
    updatewaterRate: ctrlWrapper(updateWaterRate)
}