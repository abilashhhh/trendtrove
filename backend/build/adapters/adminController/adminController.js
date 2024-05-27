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
    // const signin  = async (req: Request, res: Response) => {
    //   try {
    //     const { email, password } = req.body;
    //     const user = await handleAdminSignin(email, password, dbUserRepository, authService);
    //     console.log(user);
    //     res.json({
    //       status: "success",
    //       message: "Admin login successful",
    //       user,
    //     });
    //   } catch (err) {
    //     console.error("Error logging admin:", err);
    //     res.status(401).json({
    //       status: "error",
    //       message: "Failed to do admin login",
    //     });
    //   }
    // };
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
    const blockAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log("req params in suspend acc: ", req.params);
            const result = yield (0, adminAuthApplication_1.handleBlockAccount)(id, dbUserRepository);
            res.json({
                status: "success",
                message: "Account blocked successfully",
                result
            });
        }
        catch (err) {
            console.error("Error blocking account:", err);
            res.status(500).json({
                status: "error",
                message: err.message || "Failed to block the account",
            });
        }
    });
    const unblockAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log("req params in suspend acc: ", req.params);
            const result = yield (0, adminAuthApplication_1.handleUnBlockAccount)(id, dbUserRepository);
            res.json({
                status: "success",
                message: "Account blocked successfully",
                result
            });
        }
        catch (err) {
            console.error("Error blocking account:", err);
            res.status(500).json({
                status: "error",
                message: err.message || "Failed to block the account",
            });
        }
    });
    //////////////////////////////////////////////////
    return {
        // signin,
        logout,
        getAllUsersForAdmin,
        blockAccount,
        unblockAccount
    };
};
exports.default = adminController;
