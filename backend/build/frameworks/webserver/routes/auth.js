"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/authController/authController"));
const authService_1 = require("../../services/authService");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const userRepository_1 = require("../../database/mongodb/respositories/userRepository");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const authRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, authController_1.default)(authService_1.authService, authServiceInterface_1.authServiceInterface, userRepository_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository);
    router.post('/signup', controller.registerUser);
    return router;
};
exports.default = authRouter;
