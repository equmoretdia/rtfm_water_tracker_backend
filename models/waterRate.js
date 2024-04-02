import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const waterRateSchema = new Schema({
    waterRate:  {
        type: Number,
        default: 2,
        max: [15, "Maximum amount of your daily normal is 15L"],
    },
    date: {
        type: Date, 
        default: Date.now 
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, { versionKey: false });

waterRateSchema.post("save", handleMongooseError);

export const WaterRate = model("waterRate", waterRateSchema);

