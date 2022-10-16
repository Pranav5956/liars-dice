import { UpdateQuery } from "mongoose";
import User from "../models/User";
import { UserType, immutableFields } from "../types/user";

export const getUser = async (userId: string) => {
  return User.findOne({ userId });
};

export const createNewUser = async (
  userId: string,
  email: string,
  displayName: string
) => {
  return User.create({ userId, email, displayName });
};

export const updateUser = async (
  userId: string,
  update: UpdateQuery<Omit<UserType, immutableFields>>
) => {
  return User.findOneAndUpdate({ userId }, update, {
    new: true,
    strict: "throw",
  });
};
