import mongoose, { Types } from "mongoose";
import { StatsType } from "../types/stats";

const statsSchema = new mongoose.Schema({
  user: { type: Types.ObjectId, required: true, ref: "User" },
  gamesPlayed: { type: Number, required: true, default: 0 },
  gamesWon: { type: Number, required: true, default: 0 },
  roomsCreated: { type: Number, required: true, default: 0 },
  messages: { type: Number, required: true, default: 0 },
  onlineTime: { type: Number, required: true, default: 0 },
});

export default mongoose.model<StatsType>("Stats", statsSchema);
