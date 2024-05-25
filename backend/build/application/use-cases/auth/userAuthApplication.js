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
exports.userLoginUsingGoogle = exports.userRegisterUsingGoogle = exports.handleGoogleLoginOrSignup = exports.handleLogoutUser = exports.tokenVerification = exports.accessTokenRefresh = exports.userLogin = exports.handleResendOtp = exports.handleOtpVerification = exports.handleForgotPasswordChange = exports.handleSendOtp = exports.userRegister = void 0;
const ErrorInApplication_1 = __importDefault(require("../../../utils/ErrorInApplication"));
const otpGenerator = require("otp-generator");
// User Registration
const userRegister = (user, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmail = yield dbUserRepository.getUserByEmail(user.email);
    if (existingEmail) {
        throw new ErrorInApplication_1.default("Email already exists", 401);
    }
    const existingUsername = yield dbUserRepository.getUserByUsername(user.username);
    if (existingUsername) {
        throw new ErrorInApplication_1.default("Username already exists!", 401);
    }
    user.password = yield authService.encryptPassword(user.password);
    yield dbUserRepository.addUser(user);
    console.log(user);
});
exports.userRegister = userRegister;
// Handle OTP Sending
const handleSendOtp = (email, text, dbOtpRepository, mailSenderService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        yield dbOtpRepository.saveNewOtp({ email, otp });
        if (text === "email-verification") {
            yield mailSenderService.sendVerificationEmail(email, Number(otp));
        }
        else if (text === "forgot-password") {
            yield mailSenderService.sendForgotPasswordEmail(email, Number(otp));
        }
    }
    catch (error) {
        console.error("Error in handleSendOtp: ", error);
        throw new ErrorInApplication_1.default("Error in handleSendOtp", 401);
    }
});
exports.handleSendOtp = handleSendOtp;
const handleForgotPasswordChange = (userId, newPassword, authService, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const encryptedNewPassword = yield authService.encryptPassword(newPassword);
        // Update user's password in the database
        const user = yield dbUserRepository.updatePassword(userId, encryptedNewPassword);
        return user;
    }
    catch (err) {
        console.error("Error: ", err);
        throw new ErrorInApplication_1.default("Failed to change password", 401);
    }
});
exports.handleForgotPasswordChange = handleForgotPasswordChange;
// Handle OTP Verification
const handleOtpVerification = (email, otp, dbOtpRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestOtp = yield dbOtpRepository.getLatestOtp(email);
        if (!latestOtp || latestOtp.otp !== otp) {
            return false;
        }
        return true; // OTP verification successful
    }
    catch (error) {
        console.error("Error in handleOtpVerification: ", error);
        throw new ErrorInApplication_1.default("Error in handleOtpVerification", 401);
    }
});
exports.handleOtpVerification = handleOtpVerification;
// Handle Resending OTP
const handleResendOtp = (email, text, dbOtpRepository, mailSenderService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        yield dbOtpRepository.saveNewOtp({ email, otp });
        if (text === "email-verification") {
            yield mailSenderService.sendVerificationEmail(email, Number(otp));
        }
        else if (text === "forgot-password") {
            yield mailSenderService.sendForgotPasswordEmail(email, Number(otp));
        }
    }
    catch (error) {
        console.error("Error in handleResendOtp: ", error);
        throw new ErrorInApplication_1.default("Error in handleResendOtp", 401);
    }
});
exports.handleResendOtp = handleResendOtp;
// User Login
const userLogin = (email, password, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield dbUserRepository.getUserByEmail(email);
    if (!user) {
        throw new ErrorInApplication_1.default("Invalid email or password!", 401);
    }
    if (user.isAdmin) {
        throw new ErrorInApplication_1.default("Admins cant login!", 401);
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
    };
    const refreshToken = authService.generateRefreshToken({ userId: user._id.toString(), role: "client" });
    const accessToken = authService.generateAccessToken({ userId: user._id.toString(), role: "client" });
    yield dbUserRepository.addRefreshTokenAndExpiry(email, refreshToken); // setting the expiry to 7 days
    return { userDetails, refreshToken, accessToken };
});
exports.userLogin = userLogin;
// Access Token Refresh
const accessTokenRefresh = (cookies, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken)) {
        throw new ErrorInApplication_1.default("Invalid token", 401);
    }
    const refreshToken = cookies.refreshToken;
    const { userId, role } = authService.verifyRefreshToken(refreshToken.toString());
    if (!userId || role !== "client") {
        throw new ErrorInApplication_1.default("Invalid token", 401);
    }
    const user = yield dbUserRepository.getUserById(userId);
    if (!(user === null || user === void 0 ? void 0 : user.refreshToken) || !(user === null || user === void 0 ? void 0 : user.refreshTokenExpiresAt)) {
        throw new ErrorInApplication_1.default("Invalid token!", 401);
    }
    const expiresAt = user.refreshTokenExpiresAt.getTime();
    if (!expiresAt || Date.now() > expiresAt) {
        throw new ErrorInApplication_1.default("Invalid token!", 401);
    }
    const newAccessToken = authService.generateAccessToken({ userId, role: "client" });
    return newAccessToken;
});
exports.accessTokenRefresh = accessTokenRefresh;
// Token Verification
const tokenVerification = (token, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = authService.verifyAccessToken(token);
    if (!decodedToken) {
        throw new ErrorInApplication_1.default("Invalid token!", 401);
    }
    return decodedToken;
});
exports.tokenVerification = tokenVerification;
// Handle User Logout
const handleLogoutUser = (userId, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    yield dbUserRepository.logoutUser(userId);
});
exports.handleLogoutUser = handleLogoutUser;
const handleGoogleLoginOrSignup = (user, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    let userDetails;
    let refreshToken;
    let accessToken;
    const existingUser = yield dbUserRepository.getUserByEmail(user.email);
    if (existingUser) {
        const result = yield (0, exports.userLoginUsingGoogle)(user, dbUserRepository, authService);
        userDetails = Object.assign(Object.assign({}, result.userDetails), { password: undefined });
        refreshToken = result.refreshToken;
        accessToken = result.accessToken;
        console.log("Existing user in app usecases: userDetails:", userDetails);
        console.log("Existing user in app usecases: refreshToken:", refreshToken);
        console.log("Existing user in app usecases: accessToken:", accessToken);
    }
    else {
        const result = yield (0, exports.userRegisterUsingGoogle)(user, dbUserRepository, authService);
        userDetails = Object.assign(Object.assign({}, result.userDetails), { password: undefined });
        refreshToken = result.refreshToken;
        accessToken = result.accessToken;
        console.log("New user in app usecases: userDetails:", userDetails);
        console.log("New user in app usecases: refreshToken:", refreshToken);
        console.log("New user in app usecases: accessToken:", accessToken);
    }
    return {
        userDetails,
        refreshToken,
        accessToken,
    };
});
exports.handleGoogleLoginOrSignup = handleGoogleLoginOrSignup;
// User Registration Using Google
const userRegisterUsingGoogle = (user, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Separate code running, userRegisterUsingGoogle user details:", user);
        const username = user.name.toLocaleLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 100);
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const newPassword = yield authService.encryptPassword(generatedPassword);
        console.log("Generated password:", newPassword);
        const userData = {
            name: user.name,
            email: user.email,
            username,
            password: newPassword,
            dp: user.dp,
            isGoogleSignedIn: true,
        };
        const savedUser = yield dbUserRepository.addUser(userData);
        console.log("Registered user:", savedUser);
        const refreshToken = authService.generateRefreshToken({ userId: savedUser._id.toString(), role: "client" });
        const accessToken = authService.generateAccessToken({ userId: savedUser._id.toString(), role: "client" });
        return {
            userDetails: savedUser,
            refreshToken,
            accessToken,
        };
    }
    catch (error) {
        throw new ErrorInApplication_1.default("Failed to register user with Google", 500);
    }
});
exports.userRegisterUsingGoogle = userRegisterUsingGoogle;
// User Login Using Google
const userLoginUsingGoogle = (user, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Separate code running, userLoginUsingGoogle user details:", user);
        const existingUser = yield dbUserRepository.getUserByEmail(user.email);
        if (!existingUser) {
            throw new ErrorInApplication_1.default("User not found", 404);
        }
        if (existingUser.isAdmin) {
            throw new ErrorInApplication_1.default("Admins cant login here", 404);
        }
        if (existingUser.isBlocked) {
            throw new ErrorInApplication_1.default("Cant login, Admin blocked you!", 404);
        }
        const refreshToken = authService.generateRefreshToken({ userId: existingUser._id.toString(), role: "client" });
        const accessToken = authService.generateAccessToken({ userId: existingUser._id.toString(), role: "client" });
        return {
            userDetails: existingUser,
            refreshToken,
            accessToken,
        };
    }
    catch (error) {
        throw new ErrorInApplication_1.default("Failed to log in user with Google", 500);
    }
});
exports.userLoginUsingGoogle = userLoginUsingGoogle;
