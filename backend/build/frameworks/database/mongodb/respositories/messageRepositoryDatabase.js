"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepositoryMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ErrorInApplication_1 = __importDefault(require("../../../../utils/ErrorInApplication"));
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const socket_1 = require("../../../websocket/socket");
const app_1 = require("../../../../app");
const messageRepositoryMongoDB = () => {
    const sendMessage = (senderId, receiverId, message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let conversation = yield conversationModel_1.default.findOne({
                participants: { $all: [senderId, receiverId] },
            });
            if (!conversation) {
                conversation = new conversationModel_1.default({
                    participants: [senderId, receiverId],
                });
            }
            const newMessage = new messageModel_1.default({
                senderId,
                receiverId,
                message,
            });
            conversation.messages.push(newMessage._id);
            yield Promise.all([conversation.save(), newMessage.save()]);
            const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
            if (receiverSocketId) {
                app_1.io.to(receiverSocketId).emit("newMessage", newMessage);
            }
            console.log("newMessage", newMessage);
            return newMessage;
        }
        catch (error) {
            console.error("Error in sendMessage:", error.message);
            throw new ErrorInApplication_1.default("Error in sending message!", error);
        }
    });
    const getMessages = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conversation = yield conversationModel_1.default.findOne({
                participants: { $all: [senderId, receiverId] },
            }).populate("messages");
            if (!conversation) {
                return [];
            }
            return conversation.messages;
        }
        catch (error) {
            console.error("Error in getMessages:", error.message);
            throw new ErrorInApplication_1.default("Error in getting messages!", error);
        }
    });
    const getFriendsInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(userId) } },
                {
                    $project: {
                        following: 1,
                        followers: 1,
                    },
                },
                {
                    $addFields: {
                        mutualFriends: {
                            $setIntersection: ["$following.userId", "$followers.userId"],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "mutualFriends",
                        foreignField: "_id",
                        as: "mutualFriendsInfo",
                    },
                },
                {
                    $project: {
                        _id: 0,
                        mutualFriends: "$mutualFriendsInfo",
                    },
                },
            ]);
            if (!user.length) {
                throw new Error("User not found");
            }
            return user[0].mutualFriends;
        }
        catch (error) {
            console.error("Error in getFriendsInfo:", error.message);
            throw new ErrorInApplication_1.default("Error in getting friends info!", error);
        }
    });
    return {
        sendMessage,
        getMessages,
        getFriendsInfo,
    };
};
exports.messageRepositoryMongoDB = messageRepositoryMongoDB;
