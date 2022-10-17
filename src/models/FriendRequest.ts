import mongoose, { Types } from "mongoose";
import { FriendRequestType } from "../types/friendRequest";

const friendRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true, index: true },
  sender: { type: Types.ObjectId, required: true, ref: "User" },
  recepient: { type: Types.ObjectId, required: true, ref: "User" },
  requestedOn: { type: Date, required: true, default: Date.now },
  message: { type: String },
});

export default mongoose.model<FriendRequestType>(
  "FriendRequest",
  friendRequestSchema
);
