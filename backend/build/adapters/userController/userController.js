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
const userController = (userDBRepositoryImplementation, userDBRepositoryInterface, authServiceImplementation, authServiceInterface) => {
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    //////////////////////////////////////////////////
    const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, profileAuthApplication_1.handleGetAllUsers)(id, dbUserRepository);
            console.log(user);
            res.json({
                status: "success",
                message: "All users info fetched",
                user,
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
    const getuserprofile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username } = req.params;
            const user = yield (0, profileAuthApplication_1.handleUserbyUsername)(username, dbUserRepository);
            console.log(user);
            res.json({
                status: "success",
                message: "User info fetched",
                user,
            });
        }
        catch (err) {
            console.error("Error fetching users info:", err);
            res.status(401).json({
                status: "error",
                message: "Failed to fetch users info",
            });
        }
    });
    const followUserRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, targetUserId } = req.body;
            const result = yield (0, profileAuthApplication_1.handleFollowUserRequest)(userId, targetUserId, dbUserRepository);
            res.json({
                status: "success",
                message: result.message,
                user: result.user,
            });
        }
        catch (err) {
            res.status(401).json({
                status: "error",
                message: "Unable to send follow request, please try again",
            });
        }
    });
    const unfollowUserRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, targetUserId } = req.body;
            console.log("unfolow user: ", req.body);
            const result = yield (0, profileAuthApplication_1.handleUnFollowUserRequest)(userId, targetUserId, dbUserRepository);
            res.json({
                status: "success",
                message: result.message,
                user: result.user,
            });
        }
        catch (err) {
            res.status(401).json({
                status: "error",
                message: "Unable to unfollow user, please try again",
            });
        }
    });
    const cancelfollowUserRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, targetUserId } = req.body;
            console.log("cancelfollowUserRequest user: ", req.body);
            const result = yield (0, profileAuthApplication_1.handleCancelFollowUserRequest)(userId, targetUserId, dbUserRepository);
            res.json({
                status: "success",
                message: result.message,
                user: result.user,
            });
        }
        catch (err) {
            res.status(401).json({
                status: "error",
                message: "Unable to cancel follow request, please try again",
            });
        }
    });
    const acceptfollowUserRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, targetUserId } = req.body;
            console.log("acceptfollowUserRequest user: ", req.body);
            const result = yield (0, profileAuthApplication_1.handleAcceptFollowUserRequest)(userId, targetUserId, dbUserRepository);
            res.json({
                status: "success",
                message: result.message,
                user: result.user,
            });
        }
        catch (err) {
            res.status(401).json({
                status: "error",
                message: "Unable to accept follow request, please try again",
            });
        }
    });
    const rejectfollowUserRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, targetUserId } = req.body;
            console.log("rejectfollowUserRequest user: ", req.body);
            const result = yield handleRejectFollowUserRequest(userId, targetUserId, dbUserRepository);
            res.json({
                status: "success",
                message: result.message,
                user: result.user,
            });
        }
        catch (err) {
            res.status(401).json({
                status: "error",
                message: "Unable to  reject request, please try again",
            });
        }
    });
    return {
        getAllUsers,
        getuserprofile,
        followUserRequest,
        cancelfollowUserRequest,
        acceptfollowUserRequest,
        unfollowUserRequest,
        rejectfollowUserRequest
    };
};
exports.default = userController;
