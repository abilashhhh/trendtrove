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
            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }
            yield Promise.all([conversation.save(), newMessage.save()]);
            return newMessage;
        }
        catch (error) {
            console.log("Error in send message, messageRepositoryDatabase", error.message);
            throw new Error("Error in sending message!");
        }
    });
    const getMessages = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conversation = yield conversationModel_1.default.findOne({
                participants: { $all: [senderId, receiverId] }
            }).populate('messages');
            return conversation ? conversation.messages : [];
        }
        catch (error) {
            console.log("Error in get messages, messageRepositoryDatabase", error.message);
            throw new Error("Error in getting messages!");
        }
    });
    return {
        sendMessage,
        getMessages,
    };
};
exports.messageRepositoryMongoDB = messageRepositoryMongoDB;
