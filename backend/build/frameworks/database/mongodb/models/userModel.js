"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
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
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
    requested: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
    followers: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
    savedPosts: [
        {
            type: mongoose_1.default.Types.ObjectId,
        },
    ],
    notifications: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Message",
        },
    ],
    blockedUsers: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
