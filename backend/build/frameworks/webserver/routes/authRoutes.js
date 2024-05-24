"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/authController/authController"));
const authenticationService_1 = require("../../services/authenticationService");
const authenticationServiceInterface_1 = require("../../../application/services/authenticationServiceInterface");
const userRepositoryDatabase_1 = require("../../database/mongodb/respositories/userRepositoryDatabase");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const otpRepositoryDatabase_1 = require("../../database/mongodb/respositories/otpRepositoryDatabase");
const OTPDBRepository_1 = require("../../../application/repositories/OTPDBRepository");
const mailSendService_1 = require("../../services/mailSendService");
const mailServiceInterface_1 = require("../../../application/services/mailServiceInterface");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // add auth middleware
const authRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, authController_1.default)(authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface, userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, otpRepositoryDatabase_1.otpRepositoryMongoDB, OTPDBRepository_1.otpDbRepository, mailSendService_1.mailSenderService, mailServiceInterface_1.mailSenderServiceInterface);
    router.post("/signup", controller.registerUser);
    router.post("/signin", controller.signInUser);
    router.post("/googlesigninup", controller.loginOrSignUpUsingGoogle);
    router.get("/usernameavailablity/:username", controller.usernameAvailability);
    router.get("/emailavailability/:email", controller.emailAvailability);
    router.post("/generateotp", controller.sendOtp);
    router.post("/verifyotp", controller.verifyOtpForEmailVerification);
    router.get('/refresh', controller.refreshAccessToken);
    router.delete('/logout', authMiddleware_1.default, controller.logoutUser);
    router.post('/forgotpassword', controller.forgotPassword);
    return router;
};
exports.default = authRouter;
