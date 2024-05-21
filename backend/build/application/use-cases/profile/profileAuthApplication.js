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
exports.handleSuspendAccount = exports.handleDeleteAccount = exports.handlePasswordChange = exports.handleEditProfile = exports.handleUserInfo = void 0;
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
const handlePasswordChange = (_id, currentPassword, newPassword, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield dbUserRepository.getUserById(_id);
        if (!userExists) {
            throw new Error("User not found");
        }
        // Validate the current password
        const isPasswordValid = yield authService.comparePassword(currentPassword, userExists.password);
        if (!isPasswordValid) {
            throw new ErrorInApplication_1.default("nvalid current password", 401);
        }
        // Encrypt the new password
        const encryptedNewPassword = yield authService.encryptPassword(newPassword);
        // Update user's password in the database
        const user = yield dbUserRepository.updatePassword(_id, encryptedNewPassword);
        return user;
    }
    catch (err) {
        console.error("Error: ", err);
        throw new ErrorInApplication_1.default("Failed to change password", 401);
    }
});
exports.handlePasswordChange = handlePasswordChange;
const handleDeleteAccount = (userId, password, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield dbUserRepository.getUserById(userId);
        if (!userExists) {
            throw new Error("User not found");
        }
        // Validate the current password
        const isPasswordValid = yield authService.comparePassword(password, userExists.password);
        if (!isPasswordValid) {
            throw new ErrorInApplication_1.default("nvalid current password", 401);
        }
        // Update user's password in the database
        const user = yield dbUserRepository.deleteAccount(userId);
        return user;
    }
    catch (err) {
        console.error("Error: ", err);
        throw new ErrorInApplication_1.default("Failed to change password", 401);
    }
});
exports.handleDeleteAccount = handleDeleteAccount;
const handleSuspendAccount = (userId, password, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Userdetails in handleSUspend: ", userId, password);
        const userExists = yield dbUserRepository.getUserById(userId);
        if (!userExists) {
            throw new Error("User not found");
        }
        // Validate the current password
        const isPasswordValid = yield authService.comparePassword(password, userExists.password);
        if (!isPasswordValid) {
            throw new ErrorInApplication_1.default("nvalid current password", 401);
        }
        // Update user's password in the database
        const user = yield dbUserRepository.suspendAccount(userId);
        return user;
    }
    catch (err) {
        console.error("Error: ", err);
        throw new ErrorInApplication_1.default("Failed to change password", 401);
    }
});
exports.handleSuspendAccount = handleSuspendAccount;
