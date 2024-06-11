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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const profileAuthApplication_1 = require("../../application/use-cases/profile/profileAuthApplication");
const razorpay_1 = __importDefault(require("razorpay"));
const profileController = (userDBRepositoryImplementation, userDBRepositoryInterface, authServiceImplementation, authServiceInterface) => {
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    const getUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.body;
        console.log("Get user info2 ran : ", userId);
        const user = yield (0, profileAuthApplication_1.handleUserInfo)(userId, dbUserRepository);
        res.json({
            status: "success",
            message: "User info fetched",
            user,
        });
    }));
    const editProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const profileInfo = req.body;
        const userData = yield (0, profileAuthApplication_1.handleEditProfile)(profileInfo, dbUserRepository);
        res.json({
            status: "success",
            message: "User edited successfully",
            userData,
        });
    }));
    const changePassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, currentPassword, newPassword } = req.body;
        const userData = yield (0, profileAuthApplication_1.handlePasswordChange)(_id, currentPassword, newPassword, dbUserRepository, authService);
        res.json({
            status: "success",
            message: "Password changed successfully",
            userData,
        });
    }));
    const deleteAccount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, password } = req.params;
        const result = yield (0, profileAuthApplication_1.handleDeleteAccount)(id, password, dbUserRepository, authService);
        res.json({
            status: "success",
            message: "Account deleted successfully",
            result,
        });
    }));
    const suspendAccount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, password } = req.params;
        const result = yield (0, profileAuthApplication_1.handleSuspendAccount)(id, password, dbUserRepository, authService);
        res.json({
            status: "success",
            message: "Account suspended successfully",
            result,
        });
    }));
    const privateAccount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, password } = req.params;
        const result = yield (0, profileAuthApplication_1.handlePrivateAccount)(id, password, dbUserRepository, authService);
        res.json({
            status: "success",
            message: "Account set to private successfully",
            result,
        });
    }));
    const verifyPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, password } = req.params;
        try {
            const result = yield (0, profileAuthApplication_1.handleVerifyPassword)(id, password, dbUserRepository, authService);
            res.json({
                status: "success",
                message: "Password verified successfully",
                result,
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                status: "error",
                message: error.message || "Failed to verify password",
            });
        }
    }));
    const createRazorpayOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const razorPay = new razorpay_1.default({
                key_id: process.env.RAZORPAY_ID_KEY,
                key_secret: process.env.RAZORPAY_SECRET_KEY,
            });
            const options = req.body;
            const order = yield razorPay.orders.create(options);
            if (!order) {
                return res.status(500).send("Error creating order");
            }
            else {
                return res.json({
                    status: "success",
                    message: "Razorpay order successful",
                    order,
                });
            }
        }
        catch (error) {
            console.error("Error creating Razorpay order:", error);
            return res.status(500).send("Internal server error");
        }
    });
    return {
        getUserInfo,
        editProfile,
        changePassword,
        deleteAccount,
        suspendAccount,
        privateAccount,
        verifyPassword,
        createRazorpayOrder
    };
};
exports.default = profileController;
