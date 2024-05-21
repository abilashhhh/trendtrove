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
const adminAuthApplication_1 = require("../../application/use-cases/admin/adminAuthApplication");
const adminController = (userDBRepositoryImplementation, userDBRepositoryInterface, authServiceImplementation, authServiceInterface) => {
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    //////////////////////////////////////////////////
    const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield (0, adminAuthApplication_1.handleAdminSignin)(email, password, dbUserRepository, authService);
            console.log(user);
            res.json({
                status: "success",
                message: "Admin login successful",
                user,
            });
        }
        catch (err) {
            console.error("Error logging admin:", err);
            res.status(401).json({
                status: "error",
                message: "Failed to do admin login",
            });
        }
    });
    const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            yield (0, adminAuthApplication_1.handleLogoutAdmin)(userId, dbUserRepository);
            res.json({ status: "success", message: "Admin logged out successfully" });
        }
        catch (err) {
            console.error("Error logging out admin:", err);
            res.status(500).json({
                status: "error",
                message: "Failed to log out admin",
            });
        }
    });
    const getAllUsersForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield (0, adminAuthApplication_1.handleGetAllUsersForAdmin)(dbUserRepository);
            console.log(users);
            res.json({
                status: "success",
                message: "All users info fetched",
                users,
            });
        }
        catch (err) {
            console.error("Error fetching all users info:", err);
            res.status(401).json({
                status: "error",
                message: "Failed to fetch all users info",
            });
        }
    });
    //////////////////////////////////////////////////
    return {
        signin,
        logout,
        getAllUsersForAdmin
    };
};
exports.default = adminController;
