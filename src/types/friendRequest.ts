import { Types } from "mongoose";

export interface FriendRequestType {
  requestId: string;
  sender: Types.ObjectId;
  recepient: Types.ObjectId;
  requestedOn: Date;
  message?: string;
}
