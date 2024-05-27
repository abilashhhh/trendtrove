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
const adminController_1 = __importDefault(require("../../../adapters/adminController/adminController"));
const adminRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, adminController_1.default)(userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface);
    // router.post("/signin" , controller.signin);
    router.post("/logout", controller.logout);
    router.get("/getusersforadmin", controller.getAllUsersForAdmin);
    router.patch("/blockuser/:id", controller.blockAccount);
    router.patch("/unblockuser/:id", controller.unblockAccount);
    return router;
};
exports.default = adminRouter;
