import mongoose, { Schema, model } from "mongoose";
import userModel from "./userModel";
import messageModel from "./messageModel";

const communicationSchema = new Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: userModel.modelName, required: true },
    ],
    messages: [
      { type: Schema.Types.ObjectId, ref: messageModel.modelName, default: [] },
    ],
  },
  { timestamps: true }
);

const Communication = model("Communication", communicationSchema);

export default Communication;
