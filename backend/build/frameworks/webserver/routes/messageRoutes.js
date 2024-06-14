"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const authenticationServiceInterface_1 = require("../../../application/services/authenticationServiceInterface");
const authenticationService_1 = require("../../services/authenticationService");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const userRepositoryDatabase_1 = require("../../database/mongodb/respositories/userRepositoryDatabase");
const postRepositoryDatabase_1 = require("../../database/mongodb/respositories/postRepositoryDatabase");
const postDBRepository_1 = require("../../../application/repositories/postDBRepository");
const messageController_1 = __importDefault(require("../../../adapters/messageController/messageController"));
const MessageDBRepository_1 = require("../../../application/repositories/MessageDBRepository");
const messageRepositoryDatabase_1 = require("../../database/mongodb/respositories/messageRepositoryDatabase");
const messageRoutes = () => {
    const router = express_1.default.Router();
    const controller = (0, messageController_1.default)(userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, postRepositoryDatabase_1.postRepositoryMongoDB, postDBRepository_1.postDBRepository, authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface, messageRepositoryDatabase_1.messageRepositoryMongoDB, MessageDBRepository_1.messageDBRepository);
    router.post("/send/:userId", authMiddleware_1.default, controller.sendMessage);
    return router;
};
exports.default = messageRoutes;
