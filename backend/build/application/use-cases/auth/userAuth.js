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
exports.handleResendOtp = exports.handleOtpVerification = exports.handleSendOtp = exports.userRegister = void 0;
const ErrorInApplication_1 = __importDefault(require("../../../utils/ErrorInApplication"));
const otpGenerator = require("otp-generator");
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
