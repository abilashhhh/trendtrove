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
const ErrorInApplication_1 = __importDefault(require("../../utils/ErrorInApplication"));
const userAuth_1 = require("../../application/use-cases/auth/userAuth");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const authController = (authServiceImplementation, authServiceInterface, userDBRepositoryImplementation, userDBRepositoryInterface, otpDBRepositoryImplementation, otpDbRepositoryInterface, mailSenderServiceImplementation, mailSenderServiceInterface) => {
    const authService = authServiceInterface(authServiceImplementation());
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const dbOtpRepository = otpDbRepositoryInterface(otpDBRepositoryImplementation());
    const mailSenderService = mailSenderServiceInterface(mailSenderServiceImplementation());
    const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        try {
            yield (0, userAuth_1.userRegister)(user, dbUserRepository, authService);
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const usernameAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = req.params;
        console.log("username from controller:", username);
        try {
            const isAvailable = yield dbUserRepository.getUserByUsername(username);
            console.log("isAvailable : ", isAvailable);
            if (isAvailable === null) {
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, text } = req.body;
        yield (0, userAuth_1.handleSendOtp)(email, text, dbOtpRepository, mailSenderService);
        res.json({
            status: "success",
            message: "OTP sent",
        });
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const verifyOtpForEmailVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, otp } = req.body;
        console.log("req.body in verifyotp: ", req.body);
        const isOtpValid = yield (0, userAuth_1.handleOtpVerification)(email, otp, dbOtpRepository);
        console.log("isOtpValid: ", isOtpValid);
        if (isOtpValid) {
            return res.json({
                status: "success",
                message: "OTP verified",
            });
        }
        else {
            return res.status(400).json({
                status: "fail",
                message: "Invalid OTP",
            });
        }
    });
    return {
        registerUser,
        usernameAvailability,
        sendOtp,
        verifyOtpForEmailVerification,
    };
};
exports.default = authController;
