import mongoose, { Types } from "mongoose";

const messageReactionSchema = new mongoose.Schema(
  {
    reaction: { type: String, required: true },
    reacters: [{ type: Types.ObjectId, required: true, ref: "User" }],
  },
  { autoIndex: false }
);

const messageSchema = new mongoose.Schema({
  room: { type: Types.ObjectId, required: true, ref: "Room" },
  sender: { type: Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  reactions: [{ type: messageReactionSchema }],
  taggedMessage: { type: Types.ObjectId, ref: "Message" },
  sentOn: { type: Date, required: true, default: Date.now },
  editedOn: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
