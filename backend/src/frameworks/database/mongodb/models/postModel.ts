import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isArchived: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    captions: { type: String },
    username: { type: String },
    dp: { type: String },
    location: { type: String },
    reports: [{ type: String }],
    images: [{ type: String }],
    videos: [{ type: String }],
    hashtags: [{ type: String }],
    // mentions: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // saved: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

export default Post;
