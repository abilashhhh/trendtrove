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
exports.handleGetFriendsInfo = exports.handleGetMessage = exports.handleSendMessage = void 0;
const ErrorInApplication_1 = __importDefault(require("../../../utils/ErrorInApplication"));
const handleSendMessage = (senderId, receiverId, message, dbMessageRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sendMessage = yield dbMessageRepository.sendMessage(senderId, receiverId, message);
        console.log("sendMessage from msg auth app:", sendMessage);
        return sendMessage;
    }
    catch (error) {
        console.error("Error in handleSendMessage:", error);
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to send the message", 500);
    }
});
exports.handleSendMessage = handleSendMessage;
const handleGetMessage = (senderId, receiverId, dbMessageRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getMessage = yield dbMessageRepository.getMessages(senderId, receiverId);
        return getMessage;
    }
    catch (error) {
        console.error("Error in handleGetMessage:", error);
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get the messages", 500);
    }
});
exports.handleGetMessage = handleGetMessage;
const handleGetFriendsInfo = (userId, dbMessageRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getMessage = yield dbMessageRepository.getFriendsInfo(userId);
        return getMessage;
    }
    catch (error) {
        console.error("Error in handleGetFriendsInfo:", error);
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get the friends info", 500);
    }
});
exports.handleGetFriendsInfo = handleGetFriendsInfo;
