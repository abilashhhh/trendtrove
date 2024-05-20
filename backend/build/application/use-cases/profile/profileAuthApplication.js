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
exports.handlePasswordChange = exports.handleEditProfile = exports.handleUserInfo = void 0;
const ErrorInApplication_1 = __importDefault(require("../../../utils/ErrorInApplication"));
const handleUserInfo = (userId, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleUserInfo ran in profile usecase");
        const userData = yield dbUserRepository.getUserById(userId);
        if (!userData) {
            throw new Error("User not found!");
        }
        const user = {
            _id: userData._id.toString(),
            name: userData.name,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            dp: userData.dp,
            coverPhoto: userData.coverPhoto,
            bio: userData.bio,
            gender: userData.gender,
            address: userData.address,
            followers: userData.followers,
            following: userData.following,
            isVerifiedAccount: userData.isVerifiedAccount,
            notifications: userData.notifications,
        };
        return user;
    }
    catch (err) {
        console.log("error : ", err);
        throw new ErrorInApplication_1.default("User not found!", 401);
    }
});
exports.handleUserInfo = handleUserInfo;
const handleEditProfile = (profileInfo, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("profileInfo...............=-==========", profileInfo);
        if (profileInfo.email) {
            const userData = yield dbUserRepository.getUserByEmail(profileInfo.email);
            if (userData) {
                console.log("User exists...");
                const user = yield dbUserRepository.updateProfile(profileInfo);
                console.log("user: ", user);
            }
        }
    }
    catch (err) {
        console.log("Error:", err);
        throw new ErrorInApplication_1.default("User not found!", 401);
    }
});
exports.handleEditProfile = handleEditProfile;
const handlePasswordChange = (userData, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("userData: ", userData);
        // Check if required fields exist in userData
        if (!userData._id || !userData.currentPassword || !userData.newPassword) {
            throw new Error("Invalid user data or missing current or new password");
        }
        // Fetch user from database
        const userExists = yield dbUserRepository.getUserById(userData._id);
        if (!userExists) {
            throw new Error("User not found");
        }
        // Compare current password with stored password
        const isPasswordValid = yield authService.comparePassword(userExists.password, userData.currentPassword);
        if (!isPasswordValid) {
            throw new Error("Invalid current password");
        }
        console.log("");
        // Encrypt new password
        const newPassword = yield authService.encryptPassword(userData.newPassword);
        // Update user's password in the database
        const user = yield dbUserRepository.updatePassword(userData._id, newPassword);
        console.log("user: ", user);
    }
    catch (err) {
        console.log("Error:", err);
        throw new ErrorInApplication_1.default(err.message || "Failed to change password", 401);
    }
});
exports.handlePasswordChange = handlePasswordChange;
