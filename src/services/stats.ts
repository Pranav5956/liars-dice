import { Types, UpdateQuery } from "mongoose";
import Stats from "../models/Stats";
import { immutableFields, StatsType } from "../types/stats";

export const getStats = (user: Types.ObjectId) => {
  return Stats.findOne({ user });
};

export const updateStats = (
  user: Types.ObjectId,
  update: UpdateQuery<Omit<StatsType, immutableFields>>
) => {
  return Stats.findOneAndUpdate({ user }, update, { new: true, strict: true });
};
