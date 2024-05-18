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
exports.handleLogoutUser = exports.accessTokenRefresh = exports.userLoginUsingGoogle = exports.userLogin = exports.handleResendOtp = exports.handleOtpVerification = exports.handleSendOtp = exports.userRegister = void 0;
const ErrorInApplication_1 = __importDefault(require("../../../utils/ErrorInApplication"));
const otpGenerator = require("otp-generator");
// import { mailSenderService } from "../../../frameworks/services/mailSendService";
////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////
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
        console.log("Error in handleSendOtp: ", error);
        throw new ErrorInApplication_1.default("Error in handleSendOtp", 401);
    }
});
exports.handleSendOtp = handleSendOtp;
////////////////////////////////////////////////////////////////////////////////
const handleOtpVerification = (email, otp, dbOtpRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestOtp = yield dbOtpRepository.getLatestOtp(email);
        if (!latestOtp || latestOtp.otp !== otp) {
            return false;
        }
        return true; // OTP verification successful
    }
    catch (error) {
        console.log("Error in handleOtpVerification: ", error);
        throw new ErrorInApplication_1.default("Error in handleOtpVerification", 401);
    }
});
exports.handleOtpVerification = handleOtpVerification;
////////////////////////////////////////////////////////////////////////////////
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
        console.log("Error in handleResendOtp: ", error);
        throw new ErrorInApplication_1.default("Error in handleResendOtp", 401);
    }
});
exports.handleResendOtp = handleResendOtp;
////////////////////////////////////////////////////////////////////////////////
const userLogin = (email, password, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield dbUserRepository.getUserByEmail(email);
    if (!user) {
        throw new ErrorInApplication_1.default("Invalid email or password!", 401);
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
        city: user === null || user === void 0 ? void 0 : user.city,
        followers: user === null || user === void 0 ? void 0 : user.followers,
        following: user === null || user === void 0 ? void 0 : user.following,
        isVerifiedAccount: user === null || user === void 0 ? void 0 : user.isVerifiedAccount,
        isBlock: user === null || user === void 0 ? void 0 : user.isBlocked,
    };
    const refreshToken = authService.generateRefreshToken({ userId: user._id.toString(), role: "client" });
    const accessToken = authService.generateAccessToken({ userId: user._id.toString(), role: "client" });
    yield dbUserRepository.addRefreshTokenAndExpiry(email, refreshToken); // setting the expirry 7days
    return { userDetails, refreshToken, accessToken };
});
exports.userLogin = userLogin;
////////////////////////////////////////////////////////////////////////////////
const userLoginUsingGoogle = (user, dbUserRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user google info= ", user);
    const isExistingEmail = yield dbUserRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        if (isExistingEmail.isBlocked) {
            throw new ErrorInApplication_1.default("Your account has been blocked!", 401);
        }
        const refreshToken = authService.generateRefreshToken({ userId: isExistingEmail._id.toString(), role: "client" });
        const accessToken = authService.generateAccessToken({ userId: isExistingEmail._id.toString(), role: "client" });
        const userDetails = {
            _id: isExistingEmail._id.toString(),
            name: isExistingEmail.name,
            username: isExistingEmail.username,
            email: isExistingEmail.email,
            phone: isExistingEmail === null || isExistingEmail === void 0 ? void 0 : isExistingEmail.phone,
            coverPhoto: isExistingEmail === null || isExistingEmail === void 0 ? void 0 : isExistingEmail.coverPhoto,
            dp: isExistingEmail === null || isExistingEmail === void 0 ? void 0 : isExistingEmail.dp,
            bio: isExistingEmail === null || isExistingEmail === void 0 ? void 0 : isExistingEmail.bio,
            gender: isExistingEmail === null || isExistingEmail === void 0 ? void 0 : isExistingEmail.gender,
            city: isExistingEmail === null || isExistingEmail === void 0 ? void 0 : isExistingEmail.city,
            followers: isExistingEmail === null || isExistingEmail === void 0 ? void 0 : isExistingEmail.followers,
            following: isExistingEmail === null || isExistingEmail === void 0 ? void 0 : isExistingEmail.following,
            isVerifiedAccount: isExistingEmail.isVerifiedAccount,
            isGoogleSignIn: isExistingEmail.isGoogleSignedIn,
            isBlocked: isExistingEmail.isBlocked,
        };
        yield dbUserRepository.addRefreshTokenAndExpiry(user.email, refreshToken);
        return { userDetails, refreshToken, accessToken };
    }
    const newUser = { name: user.name, email: user.email, isAccountVerified: true, isGoogleSignIn: true };
    const newUserData = yield dbUserRepository.addUser(newUser);
    if (newUserData) {
        const refreshToken = authService.generateRefreshToken({
            userId: newUserData._id.toString(),
            role: "client"
        });
        const accessToken = authService.generateAccessToken({
            userId: newUserData._id.toString(),
            role: "client"
        });
        const userDetails = {
            _id: newUserData._id.toString(),
            name: newUserData.name,
            username: newUserData.username,
            email: newUserData.email,
            phone: newUserData === null || newUserData === void 0 ? void 0 : newUserData.phone,
            coverPhoto: newUserData === null || newUserData === void 0 ? void 0 : newUserData.coverPhoto,
            dp: newUserData === null || newUserData === void 0 ? void 0 : newUserData.dp,
            bio: newUserData === null || newUserData === void 0 ? void 0 : newUserData.bio,
            gender: newUserData === null || newUserData === void 0 ? void 0 : newUserData.gender,
            city: newUserData === null || newUserData === void 0 ? void 0 : newUserData.city,
            followers: newUserData === null || newUserData === void 0 ? void 0 : newUserData.followers,
            following: newUserData === null || newUserData === void 0 ? void 0 : newUserData.following,
            isVerifiedAccount: newUserData.isVerifiedAccount,
            isGoogleSignIn: true,
            isBlocked: newUserData.isBlocked,
        };
        yield dbUserRepository.addRefreshTokenAndExpiry(newUserData.email, refreshToken);
        return { userDetails, refreshToken, accessToken };
    }
    else {
        throw new ErrorInApplication_1.default("Something went wrong!", 500);
    }
});
exports.userLoginUsingGoogle = userLoginUsingGoogle;
////////////////////////////////////////////////////////////////////////////////
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
    const newAccessToken = authService.generateAccessToken({ userId: userId, role: "client" });
    return newAccessToken;
});
exports.accessTokenRefresh = accessTokenRefresh;
///////////////////////////////////////////////////////////////////////////////
const tokenVerification = (token, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = authService.verifyAccessToken(token);
    if (!decodedToken) {
        throw new ErrorInApplication_1.default("Invalid token!", 401);
    }
    else {
        return decodedToken;
    }
});
///////////////////////////////////////////////////////////////////////////////
const handleLogoutUser = (userId, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    yield dbUserRepository.logoutUser(userId);
});
exports.handleLogoutUser = handleLogoutUser;
