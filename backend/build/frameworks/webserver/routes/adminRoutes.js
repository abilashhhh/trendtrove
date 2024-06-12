"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminMiddleware_1 = __importDefault(require("../middlewares/adminMiddleware"));
const authenticationServiceInterface_1 = require("../../../application/services/authenticationServiceInterface");
const authenticationService_1 = require("../../services/authenticationService");
const userRepositoryDatabase_1 = require("../../database/mongodb/respositories/userRepositoryDatabase");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const adminController_1 = __importDefault(require("../../../adapters/adminController/adminController"));
const postDBRepository_1 = require("../../../application/repositories/postDBRepository");
const postRepositoryDatabase_1 = require("../../database/mongodb/respositories/postRepositoryDatabase");
const adminRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, adminController_1.default)(userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, postRepositoryDatabase_1.postRepositoryMongoDB, postDBRepository_1.postDBRepository, authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface);
    router.delete("/logout", adminMiddleware_1.default, controller.logout);
    router.get("/getusersforadmin", adminMiddleware_1.default, controller.getAllUsersForAdmin);
    router.get("/getallpostreportsandposts", adminMiddleware_1.default, controller.getallpostreports);
    router.get("/getpremiumaccountrequests", adminMiddleware_1.default, controller.getpremiumaccountrequests);
    router.patch("/blockuser/:id", adminMiddleware_1.default, controller.blockAccount);
    router.patch("/unblockuser/:id", adminMiddleware_1.default, controller.unblockAccount);
    router.patch("/blockpost/:postId", adminMiddleware_1.default, controller.blockPost);
    router.patch("/unblockpost/:postId", adminMiddleware_1.default, controller.unblockPost);
    return router;
};
exports.default = adminRouter;
