import { Types } from "mongoose";

export interface UserType {
  _id: Types.ObjectId;
  userId: string;
  displayName: string;
  email: string;
  avatar?: string;
  friends?: Types.Array<Types.ObjectId>;
  lastOnline: Date;
  createdOn: Date;
  lastUpdatedOn: Date;
}

export type immutableFields = "_id" | "userId" | "createdOn";
