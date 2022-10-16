import mongoose, { Types } from "mongoose";
import { UserType } from "../types/user";
import Stats from "./Stats";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  displayName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  friends: [{ type: Types.ObjectId, required: true, ref: "User" }],
  lastOnline: { type: Date, required: true, default: Date.now },
  createdOn: { type: Date, required: true, default: Date.now },
  lastUpdatedOn: { type: Date, required: true, default: Date.now },
});

userSchema.post("save", async (user, next) => {
  if (!user.isNew) {
    return next();
  }

  await Stats.create({ user: user._id });
  next();
});

export default mongoose.model<UserType>("User", userSchema);
