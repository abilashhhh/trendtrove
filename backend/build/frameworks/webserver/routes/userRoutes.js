"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationServiceInterface_1 = require("../../../application/services/authenticationServiceInterface");
const authenticationService_1 = require("../../services/authenticationService");
const userRepositoryDatabase_1 = require("../../database/mongodb/respositories/userRepositoryDatabase");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const userController_1 = __importDefault(require("../../../adapters/userController/userController"));
const userRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, userController_1.default)(userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface);
    router.get("/getallusers/:id", controller.getAllUsers);
    router.get("/getuserprofile/:username", controller.getuserprofile);
    router.post("/followuser", controller.followUserRequest);
    router.post("/unfollowuser", controller.unfollowUserRequest);
    router.post("/cancelrequest", controller.cancelfollowUserRequest);
    router.post("/acceptrequest", controller.acceptfollowUserRequest);
    router.post("/rejectrequest", controller.rejectfollowUserRequest);
    return router;
};
exports.default = userRouter;
