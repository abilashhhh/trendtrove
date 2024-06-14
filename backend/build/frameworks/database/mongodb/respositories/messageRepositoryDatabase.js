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
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const messageRepositoryMongoDB = () => {
    const sendMessage = (senderId, receiverId, message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("send message reached, senderId:", senderId, "receiverId:", receiverId, "message:", message);
            let conversation = yield conversationModel_1.default.findOne({
                participants: { $all: [senderId, receiverId] },
            });
            if (!conversation) {
                conversation = yield conversationModel_1.default.create({
                    participants: [senderId, receiverId],
                });
            }
            const newMessage = yield messageModel_1.default.create({ senderId, receiverId, message });
            console.log("conversation: ", conversation);
            console.log("new message: ", newMessage);
            if (newMessage) {
                conversation.messages.push(newMessage._id);
                yield conversation.save(); // Save the updated conversation with the new message
            }
            return newMessage;
        }
        catch (error) {
            console.log("Error in send message, messageRepositoryDatabase", error.message);
            throw new Error("Error in sending message!");
        }
    });
    return {
        sendMessage,
    };
};
exports.messageRepositoryMongoDB = messageRepositoryMongoDB;
