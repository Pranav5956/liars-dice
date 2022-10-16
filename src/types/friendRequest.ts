import { Types } from "mongoose";

export interface FriendRequest {
  requestId: string;
  sender: Types.ObjectId;
  recepient: Types.ObjectId;
  requestedOn: Date;
  message?: string;
}
