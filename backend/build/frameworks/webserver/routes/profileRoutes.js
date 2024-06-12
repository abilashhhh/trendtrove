"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const authenticationServiceInterface_1 = require("../../../application/services/authenticationServiceInterface");
const authenticationService_1 = require("../../services/authenticationService");
const userRepositoryDatabase_1 = require("../../database/mongodb/respositories/userRepositoryDatabase");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const profileController_1 = __importDefault(require("../../../adapters/profileController/profileController"));
const profileRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, profileController_1.default)(userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface);
    router.get("/getuserinfo", authMiddleware_1.default, controller.getUserInfo);
    router.patch("/editprofile", authMiddleware_1.default, controller.editProfile);
    router.patch("/changepassword", authMiddleware_1.default, controller.changePassword);
    router.delete("/deleteaccount/:id/:password", authMiddleware_1.default, controller.deleteAccount);
    router.patch("/suspendaccount/:id/:password", authMiddleware_1.default, controller.suspendAccount);
    router.patch("/privateaccount/:id/:password", authMiddleware_1.default, controller.privateAccount);
    router.get("/verifypassword/:id/:password", authMiddleware_1.default, controller.verifyPassword);
    router.post("/makepayment", authMiddleware_1.default, controller.makeVerifiedAccountPayment);
    router.post("/premiumaccount", authMiddleware_1.default, controller.setPremiumAccount);
    return router;
};
exports.default = profileRouter;
