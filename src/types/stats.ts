import { Types } from "mongoose";

export interface StatsType {
  user: Types.ObjectId;
  gamesPlayed: Number;
  gamesWon: Number;
  roomsCreated: Number;
  messages: Number;
  onlineTime: Number;
}

export type immutableFields = "user";
