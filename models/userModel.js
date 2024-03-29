import mongoose from "mongoose";

  const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\])| (([a - zA - Z\-0 - 9] +\.) +[a - zA - Z]{ 2,})) $ /;


const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      minlength: 8,
      maxheight: 64,
      required: [true, "Password is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    
  },
  { versionKey: false }
);

export default mongoose.model("User", userSchema);


