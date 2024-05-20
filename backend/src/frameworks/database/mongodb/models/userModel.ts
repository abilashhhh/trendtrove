import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      minlength: 6,
    },
    dp: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    coverPhoto: {
      type: String,
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },

    isVerifiedAccount: {
      type: Boolean,
      default: false,
    },
    isGoogleSignedIn: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    refreshTokenExpiresAt: {
      type: Date,
      default: null,
    },
    posts: [],
    requests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    requested: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    savedPosts: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    notifications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    ],
    blockedUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
