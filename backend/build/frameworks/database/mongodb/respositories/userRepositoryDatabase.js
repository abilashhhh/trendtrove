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
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
//////////////////////////////////////////////////////////
const userRepositoryMongoDB = () => {
    //////////////////////////////////////////////////////////
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Add user tried to run, data : ", user);
            const newUser = new userModel_1.default(user);
            return yield newUser.save();
        }
        catch (error) {
            console.log(error);
            throw new Error("Error adding user!");
        }
    });
    //////////////////////////////////////////////////////////
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findOne({ email });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting user by email!");
        }
    });
    //////////////////////////////////////////////////////////
    const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(userId);
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting user by userId!");
        }
    });
    //////////////////////////////////////////////////////////
    const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("repo ;", username);
            const user = yield userModel_1.default.findOne({ username });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting user by username!");
        }
    });
    //////////////////////////////////////////////////////////
    const logoutUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userModel_1.default.updateOne({
                _id: userId
            }, { $unset: { refreshToken: 1, refreshTokenExpiresAt: 1 }
            });
        }
        catch (error) {
            throw new Error("Error logging out user");
        }
    });
    //////////////////////////////////////////////////////////
    const addRefreshTokenAndExpiry = (email, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const user = yield userModel_1.default.findOneAndUpdate({ email }, { refreshToken, refreshTokenExpiresAt }, { new: true });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error adding refresh token and expiry!");
        }
    });
    //////////////////////////////////////////////////////////
    const updateProfile = (profileInfo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(profileInfo._id, profileInfo, { new: true });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating profile!");
        }
    });
    const updatePassword = (_id, encryptedNewPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(_id, { password: encryptedNewPassword }, { new: true });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        }
        catch (error) {
            console.error("Error updating password:", error);
            throw new Error("Error updating password!");
        }
    });
    const deleteAccount = (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndDelete(_id);
            return user;
        }
        catch (error) {
            console.error("Error updating password:", error);
            throw new Error("Error updating password!");
        }
    });
    const suspendAccount = (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(_id, { isSuspended: true }, { new: true });
            return user;
        }
        catch (error) {
            console.error("Error suspending account:", error);
            throw new Error("Error suspending account!");
        }
    });
    const changeIsAccountVerified = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userModel_1.default.updateOne({ email }, {
                $set: {
                    isAccountVerified: true,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error changing isAccountVerified field");
        }
    });
    const changeIsAccountUnverified = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userModel_1.default.updateOne({ _id: userId }, {
                $set: {
                    isAccountVerified: false,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error changing isAccountVerified field");
        }
    });
    return {
        addUser,
        getUserByEmail,
        getUserById,
        getUserByUsername,
        addRefreshTokenAndExpiry,
        logoutUser,
        updateProfile,
        updatePassword,
        changeIsAccountVerified,
        changeIsAccountUnverified,
        deleteAccount,
        suspendAccount
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
