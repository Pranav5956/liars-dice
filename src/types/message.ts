import { Types } from "mongoose";

export interface MessageReactionType {
  reaction: string;
  reacters: Types.Array<Types.ObjectId>;
}

export interface MessageType {
  room: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
  reactions: Types.Array<MessageReactionType>;
  taggedMessage?: Types.ObjectId;
  sentOn: Date;
  editedOn: Date;
}

export type immutableFields = "room" | "sender" | "sentOn";
