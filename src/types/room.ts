import { Types } from "mongoose";

export interface RoomType {
  roomId: string;
  name: string;
  description?: string;
  maxMembers: Number;
  admin: Types.ObjectId;
  members: Types.Array<Types.ObjectId>;
  createdOn: Date;
}

export type immutableFields = "roomId" | "createdOn";
