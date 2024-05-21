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
exports.userDBRepository = void 0;
const userDBRepository = (repository) => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addUser(user); });
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserByEmail(email); });
    const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserById(userId); });
    const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserByUsername(username); });
    const logoutUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.logoutUser(userId); });
    const addRefreshTokenAndExpiry = (email, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.addRefreshTokenAndExpiry(email, refreshToken);
    });
    const changeIsAccountVerified = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.changeIsAccountVerified(email); });
    const changeIsAccountUnverified = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.changeIsAccountUnverified(userId); });
    const updateProfile = (profileInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateProfile(profileInfo); });
    const updatePassword = (_id, encryptedNewPassword) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updatePassword(_id, encryptedNewPassword); });
    return {
        addUser,
        getUserByEmail,
        getUserByUsername,
        addRefreshTokenAndExpiry,
        getUserById,
        logoutUser,
        updateProfile,
        updatePassword,
        changeIsAccountVerified,
        changeIsAccountUnverified,
    };
};
exports.userDBRepository = userDBRepository;
