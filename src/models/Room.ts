import mongoose, { Types } from "mongoose";
import { RoomType } from "../types/room";
import Message from "./Message";

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String },
  maxMembers: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "${VALUE} is not an integer!",
    },
  },
  admin: { type: Types.ObjectId, required: true, ref: "User" },
  members: [{ type: Types.ObjectId, required: true, ref: "User" }],
  createdOn: { type: Date, required: true, default: Date.now },
});

roomSchema.pre("findOneAndDelete", async function (next) {
  await Message.deleteMany({ room: this.get("_id") });
  next();
});

export default mongoose.model<RoomType>("Room", roomSchema);
