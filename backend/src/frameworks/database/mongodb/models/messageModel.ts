import mongoose, { Schema, model } from "mongoose";
import User from "./userModel";

const messageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: User, required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: User, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

export default Message;
