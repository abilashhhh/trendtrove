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
const postController_1 = __importDefault(require("../../../adapters/postController/postController"));
const postRepositoryDatabase_1 = require("../../database/mongodb/respositories/postRepositoryDatabase");
const PostDBRepository_1 = require("../../../application/repositories/PostDBRepository");
const postRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, postController_1.default)(userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, postRepositoryDatabase_1.postRepositoryMongoDB, PostDBRepository_1.postDBRepository, authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface);
    router.post("/addpost", authMiddleware_1.default, controller.addPost);
    router.get("/getpostforuser/:id", authMiddleware_1.default, controller.getpostforuser);
    router.post("/reportpost", authMiddleware_1.default, controller.reportPost);
    router.post("/savepost", authMiddleware_1.default, controller.savePost);
    router.post("/likepost", authMiddleware_1.default, controller.likePost);
    router.post("/dislikepost", authMiddleware_1.default, controller.dislikePost);
    return router;
};
exports.default = postRouter;
