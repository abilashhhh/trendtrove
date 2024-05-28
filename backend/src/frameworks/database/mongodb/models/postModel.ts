import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contentType: {
      type: String,
      enum: ["text", "image", "video"],
      required: true,
    },
    isArchived: { type: Boolean, default: false },
    captions: { type: String },
    location: { type: String },
    images: [{ type: String }],
    videos: [{ type: String }],
    hashtags: [{ type: String }],
    mentions: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
    saved: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

export default Post;
