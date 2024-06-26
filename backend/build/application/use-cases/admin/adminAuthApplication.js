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
exports.handleUnBlockAccount = exports.handleBlockAccount = exports.handleGetAllUsersForAdmin = exports.handleLogoutAdmin = exports.handleAdminSignin = void 0;
const ErrorInApplication_1 = __importDefault(require("../../../utils/ErrorInApplication"));
// User Login
const handleAdminSignin = (email, password, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield dbUserRepository.getUserByEmail(email);
    if (!user) {
        throw new ErrorInApplication_1.default("Invalid email or password!", 401);
    }
    if (!user.isAdmin) {
        throw new ErrorInApplication_1.default("This is admins login. Users cant login here!", 401);
    }
    if (user.isBlocked) {
        throw new ErrorInApplication_1.default("Your account has been blocked!", 401);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, ((_a = user === null || user === void 0 ? void 0 : user.password) === null || _a === void 0 ? void 0 : _a.toString()) || "");
    if (!isPasswordCorrect) {
        throw new ErrorInApplication_1.default("Invalid email or password!", 401);
    }
    const userDetails = {
        _id: user === null || user === void 0 ? void 0 : user._id.toString(),
        name: user === null || user === void 0 ? void 0 : user.name,
        username: user === null || user === void 0 ? void 0 : user.username,
        email: user === null || user === void 0 ? void 0 : user.email,
        phone: user === null || user === void 0 ? void 0 : user.phone,
        coverPhoto: user === null || user === void 0 ? void 0 : user.coverPhoto,
        dp: user === null || user === void 0 ? void 0 : user.dp,
        bio: user === null || user === void 0 ? void 0 : user.bio,
        gender: user === null || user === void 0 ? void 0 : user.gender,
        address: user === null || user === void 0 ? void 0 : user.address,
        followers: user === null || user === void 0 ? void 0 : user.followers,
        following: user === null || user === void 0 ? void 0 : user.following,
        isVerifiedAccount: user === null || user === void 0 ? void 0 : user.isVerifiedAccount,
        isGoogleSignedIn: user === null || user === void 0 ? void 0 : user.isGoogleSignedIn,
        isBlocked: user === null || user === void 0 ? void 0 : user.isBlocked,
        isAdmin: user === null || user === void 0 ? void 0 : user.isAdmin,
    };
    const refreshToken = authService.generateRefreshToken({ userId: user._id.toString(), role: "admin" });
    const accessToken = authService.generateAccessToken({ userId: user._id.toString(), role: "admin" });
    yield dbUserRepository.addRefreshTokenAndExpiry(email, refreshToken); // setting the expiry to 7 days
    return { userDetails, refreshToken, accessToken };
});
exports.handleAdminSignin = handleAdminSignin;
const handleLogoutAdmin = (userId, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    yield dbUserRepository.logoutUser(userId);
});
exports.handleLogoutAdmin = handleLogoutAdmin;
const handleGetAllUsersForAdmin = (dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleyeallusers called");
        const user = yield dbUserRepository.getAllUsersForAdmin();
        return user;
    }
    catch (err) {
        console.error("Error: ", err);
        throw new ErrorInApplication_1.default("Failed to get all users data", 401);
    }
});
exports.handleGetAllUsersForAdmin = handleGetAllUsersForAdmin;
const handleBlockAccount = (userId, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Userdetails in handle block: ", userId);
        const userExists = yield dbUserRepository.getUserById(userId);
        if (!userExists) {
            throw new Error("User not found");
        }
        // Update user's password in the database
        const user = yield dbUserRepository.blockAccount(userId);
        return user;
    }
    catch (err) {
        console.error("Error: ", err);
        throw new ErrorInApplication_1.default("Failed to block user", 401);
    }
});
exports.handleBlockAccount = handleBlockAccount;
const handleUnBlockAccount = (userId, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Userdetails in handle unblock: ", userId);
        const userExists = yield dbUserRepository.getUserById(userId);
        if (!userExists) {
            throw new Error("User not found");
        }
        // Update user's password in the database
        const user = yield dbUserRepository.unblockAccount(userId);
        return user;
    }
    catch (err) {
        console.error("Error: ", err);
        throw new ErrorInApplication_1.default("Failed to unblock user", 401);
    }
});
exports.handleUnBlockAccount = handleUnBlockAccount;
