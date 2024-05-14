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
Object.defineProperty(exports, "__esModule", { value: true });
// use cases
const userAuth_1 = require("../../application/use-cases/auth/userAuth");
const authController = (authServiceImplementation, authServiceInterface, userDBRepositoryImplementation, userDBRepositoryInterface) => {
    const authService = authServiceInterface(authServiceImplementation());
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        yield (0, userAuth_1.userRegister)(user, dbUserRepository, authService);
        res.json({
            status: "success",
            message: "User verified"
        });
    });
    return {
        registerUser
    };
};
exports.default = authController;
