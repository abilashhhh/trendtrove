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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const messageAuthApplication_1 = require("../../application/use-cases/message/messageAuthApplication");
const messageController = (userDBRepositoryImplementation, userDBRepositoryInterface, postDBRepositoryImplementation, postDBRepositoryInterface, authServiceImplementation, authenticationServiceInterface, messageDBRepositoryImplementation, messageDBRepositoryInterface) => {
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const dbPostRepository = postDBRepositoryInterface(postDBRepositoryImplementation());
    const authService = authenticationServiceInterface(authServiceImplementation());
    const dbMessageRepository = messageDBRepositoryInterface(messageDBRepositoryImplementation());
    const sendMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const message = req.body;
        const { receiverId } = req.params;
        const senderId = req.body.userId;
        console.log("REq body, message: ", message);
        console.log("REq params:, receiverid ", receiverId);
        console.log(": senderid", senderId);
        const sendMessageResult = yield (0, messageAuthApplication_1.handleSendMessage)(senderId, receiverId, message, dbMessageRepository);
        res.status(201).json({
            status: "success",
            message: "Post created successfully",
            data: sendMessageResult,
        });
    }));
    return {
        sendMessage,
    };
};
exports.default = messageController;
