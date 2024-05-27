"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    contentType: {
        type: String,
        enum: ["text", "image", "video"],
        required: true,
    },
    isArchived: { type: Boolean, default: false },
    text: { type: String },
    location: { type: String },
    images: [{ type: String }],
    videos: [{ type: String }],
    hashtags: [{ type: String }],
    mentions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    saved: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
}, {
    timestamps: true,
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
