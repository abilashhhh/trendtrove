import mongoose, { Schema, model } from "mongoose";
import User from "./userModel";

const messageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: User, required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: User, required: true },
    message: { type: String },
    media: { type: String },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

export default Message;
