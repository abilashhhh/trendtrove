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
const profileAuthApplication_1 = require("../../application/use-cases/profile/profileAuthApplication");
const profileController = (userDBRepositoryImplementation, userDBRepositoryInterface, authServiceImplementation, authServiceInterface) => {
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    //////////////////////////////////////////////////
    const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("req.params; : ", req.params);
            const { id } = req.params;
            const user = yield (0, profileAuthApplication_1.handleUserInfo)(id, dbUserRepository);
            console.log(user);
            res.json({
                status: "success",
                message: "user info fetched",
                user,
            });
        }
        catch (err) {
            console.error("Error fetching user info:", err);
            res.status(401).json({
                status: "error",
                message: "Failed to fetch user info",
            });
        }
    });
    //////////////////////////////////////////////////
    return {
        getUserInfo,
    };
};
exports.default = profileController;
