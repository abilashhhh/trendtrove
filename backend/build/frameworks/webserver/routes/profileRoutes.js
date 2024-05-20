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
const profileController_1 = __importDefault(require("../../../adapters/profileController/profileController"));
const profileRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, profileController_1.default)(userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface);
    router.get("/getuserinfo/:id", controller.getUserInfo);
    router.patch("/editprofile", controller.editProfile);
    router.patch("/changepassword", controller.changePassword);
    // router.delete("/deleteaccount" ,controller.deleteAccount);
    // router.patch("/suspendaccount" ,controller.suspendAccount);
    // router.get('/getotheruserinfo/:id', authMiddleware, controller.getOtherUserInfo);
    return router;
};
exports.default = profileRouter;
