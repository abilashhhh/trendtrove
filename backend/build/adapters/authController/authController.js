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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorInApplication_1 = __importDefault(require("../../utils/ErrorInApplication"));
const userAuthApplication_1 = require("../../application/use-cases/auth/userAuthApplication");
const authController = (authServiceImplementation, authServiceInterface, userDBRepositoryImplementation, userDBRepositoryInterface, otpDBRepositoryImplementation, otpDbRepositoryInterface, mailSenderServiceImplementation, mailSenderServiceInterface) => {
    const authService = authServiceInterface(authServiceImplementation());
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const dbOtpRepository = otpDbRepositoryInterface(otpDBRepositoryImplementation());
    const mailSenderService = mailSenderServiceInterface(mailSenderServiceImplementation());
    const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        try {
            yield (0, userAuthApplication_1.userRegister)(user, dbUserRepository, authService);
            res.status(200).json({
                status: "success",
                message: "User registered successfully",
            });
        }
        catch (error) {
            console.error("Error registering user:", error);
            if (error instanceof ErrorInApplication_1.default) {
                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    status: "error",
                    message: "Failed to register the user",
                });
            }
        }
    });
    const usernameAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = req.params;
        try {
            const isAvailable = yield dbUserRepository.getUserByUsername(username);
            if (!isAvailable) {
                res.json({
                    available: true,
                    status: "Username is available",
                });
            }
            else {
                res.json({
                    available: false,
                    status: "Username not available",
                });
            }
        }
        catch (error) {
            console.error("Error checking username availability:", error);
            res.status(500).json({
                status: "error",
                message: "Failed to check username availability",
            });
        }
    });
    const emailAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.params;
        try {
            const isAvailable = yield dbUserRepository.getUserByEmail(email);
            if (!isAvailable) {
                res.json({
                    available: true,
                    status: "",
                });
            }
            else {
                res.json({
                    available: false,
                    status: "Email id already registered, Try logging in",
                });
            }
        }
        catch (error) {
            console.error("Error checking email availability:", error);
            res.status(500).json({
                status: "error",
                message: "Failed to check email availability",
            });
        }
    });
    const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, text } = req.body;
        try {
            const isAvailable = yield dbUserRepository.getUserByEmail(email);
            if (isAvailable) {
                yield (0, userAuthApplication_1.handleSendOtp)(email, text, dbOtpRepository, mailSenderService);
                res.json({
                    status: "success",
                    message: "OTP sent to the given mail id",
                });
            }
            else {
                res.json({
                    status: "error",
                    message: "Email id not registered, Try signing up",
                });
            }
        }
        catch (error) {
        }
    });
    const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, text } = req.body;
        yield (0, userAuthApplication_1.handleSendOtp)(email, text, dbOtpRepository, mailSenderService);
        res.json({
            status: "success",
            message: "OTP sent",
        });
    });
    const verifyOtpForEmailVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, otp } = req.body;
        const isOtpValid = yield (0, userAuthApplication_1.handleOtpVerification)(email, otp, dbOtpRepository);
        if (isOtpValid) {
            return res.json({
                status: "success",
                message: "OTP verified",
            });
        }
        else {
            return res.status(400).json({
                status: "failed",
                message: "Invalid OTP",
            });
        }
    });
    const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const { userDetails, refreshToken, accessToken } = yield (0, userAuthApplication_1.userLogin)(email, password, dbUserRepository, authService);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            res.json({
                status: "success",
                message: "user verified",
                user: userDetails,
                accessToken
            });
        }
        catch (error) {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
    });
    const loginOrSignUpUsingGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        try {
            const { userDetails, refreshToken, accessToken } = yield (0, userAuthApplication_1.handleGoogleLoginOrSignup)(user, dbUserRepository, authService);
            console.log("UserDetails in loginOrSignUpUsingGoogle from adapterd: ", userDetails, refreshToken, accessToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true, // use in HTTPS only
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            // Remove the password from userDetails
            const _a = userDetails._doc, { password } = _a, userDetailsWithoutPassword = __rest(_a, ["password"]);
            console.log("Returning user details: ", userDetailsWithoutPassword);
            res.json({
                status: "success",
                message: "User verified",
                user: userDetailsWithoutPassword,
                accessToken,
            });
        }
        catch (error) {
            console.error("Error logging in or signing up with Google:", error);
            res.status(500).json({
                status: "error",
                message: "Failed to log in or sign up using Google",
            });
        }
    });
    const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cookies = req.cookies;
            const accessToken = yield (0, userAuthApplication_1.accessTokenRefresh)(cookies, dbUserRepository, authService);
            res.json({ accessToken });
        }
        catch (error) {
            res.status(404).json({
                status: "error",
                message: "Failed to refresh access token",
            });
        }
    });
    const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            const cookies = req.cookies;
            if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken)) {
                res.sendStatus(204);
            }
            yield (0, userAuthApplication_1.handleLogoutUser)(userId, dbUserRepository);
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "none",
            });
            res.json({
                status: "success",
                message: "Cookie Cleared"
            });
        }
        catch (error) {
            res.json({
                status: "fail",
                message: "Cookie Not Cleared"
            });
        }
    });
    return {
        registerUser,
        usernameAvailability,
        sendOtp,
        verifyOtpForEmailVerification,
        emailAvailability,
        signInUser,
        refreshAccessToken,
        logoutUser,
        loginOrSignUpUsingGoogle,
        forgotPassword
    };
};
exports.default = authController;
