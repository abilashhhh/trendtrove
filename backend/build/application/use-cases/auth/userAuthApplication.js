"use strict";
// import ErrorInApplication from "../../../utils/ErrorInApplication";
// const otpGenerator = require("otp-generator");
// import { UserDBInterface } from "../../repositories/userDBRepository";
// import { AuthServiceInterface } from "../../services/authenticationServiceInterface";
// import { GoogleUserInterface, UserInterface } from "../../../types/userInterface";
// import { OtpDbInterface } from "../../repositories/OTPDBRepository";
// import { MailSenderServiceInterface } from "../../services/mailServiceInterface";
// // import { mailSenderService } from "../../../frameworks/services/mailSendService";
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
exports.userLoginUsingGoogle = exports.userRegisterUsingGoogle = exports.handleGoogleLoginOrSignup = exports.handleLogoutUser = exports.tokenVerification = exports.accessTokenRefresh = exports.userLogin = exports.handleResendOtp = exports.handleOtpVerification = exports.handleSendOtp = exports.userRegister = void 0;
// ////////////////////////////////////////////////////////////////////////////////
// export const userRegister = async (
//   user: UserInterface,
//   dbUserRepository: ReturnType<UserDBInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   const existingEmail = await dbUserRepository.getUserByEmail(user.email);
//   if (existingEmail) {
//     throw new ErrorInApplication("Email already exists", 401);
//   }
//   const existingUsername = await dbUserRepository.getUserByUsername(
//     user.username
//   );
//   if (existingUsername) {
//     throw new ErrorInApplication("Username already exists!", 401);
//   }
//   user.password = await authService.encryptPassword(user.password);
//   await dbUserRepository.addUser(user);
//   console.log(user);
// };
// ////////////////////////////////////////////////////////////////////////////////
// export const handleSendOtp = async (
//   email: string,
//   text: string,
//   dbOtpRepository: ReturnType<OtpDbInterface>,
//   mailSenderService: ReturnType<MailSenderServiceInterface>
// ) => {
//   try {
//     const otp = otpGenerator.generate(6, {
//       lowerCaseAlphabets: false,
//       upperCaseAlphabets: false,
//       specialChars: false,
//     });
//     await dbOtpRepository.saveNewOtp({ email, otp });
//     if (text === "email-verification") {
//       await mailSenderService.sendVerificationEmail(email, Number(otp));
//     } else if (text === "forgot-password") {
//       await mailSenderService.sendForgotPasswordEmail(email, Number(otp));
//     }
//   } catch (error) {
//     console.log("Error in handleSendOtp: ", error);
//     throw new ErrorInApplication("Error in handleSendOtp", 401);
//   }
// };
// ////////////////////////////////////////////////////////////////////////////////
// export const handleOtpVerification = async (
//   email: string,
//   otp: string,
//   dbOtpRepository: ReturnType<OtpDbInterface>
// ) => {
//   try {
//     const latestOtp = await dbOtpRepository.getLatestOtp(email);
//     if (!latestOtp || latestOtp.otp !== otp) {
//       return false;
//     }
//     return true; // OTP verification successful
//   } catch (error) {
//     console.log("Error in handleOtpVerification: ", error);
//     throw new ErrorInApplication("Error in handleOtpVerification", 401);
//   }
// };
// ////////////////////////////////////////////////////////////////////////////////
// export const handleResendOtp = async (
//   email: string,
//   text: string,
//   dbOtpRepository: ReturnType<OtpDbInterface>,
//   mailSenderService: ReturnType<MailSenderServiceInterface>
// ) => {
//   try {
//     const otp = otpGenerator.generate(6, {
//       lowerCaseAlphabets: false,
//       upperCaseAlphabets: false,
//       specialChars: false,
//     });
//     await dbOtpRepository.saveNewOtp({ email, otp });
//     if (text === "email-verification") {
//       await mailSenderService.sendVerificationEmail(email, Number(otp));
//     } else if (text === "forgot-password") {
//       await mailSenderService.sendForgotPasswordEmail(email, Number(otp));
//     }
//   } catch (error) {
//     console.log("Error in handleResendOtp: ", error);
//     throw new ErrorInApplication("Error in handleResendOtp", 401);
//   }
// };
// ////////////////////////////////////////////////////////////////////////////////
// export const userLogin = async (
//   email: string,
//   password: string,
//   dbUserRepository: ReturnType<UserDBInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   const user = await dbUserRepository.getUserByEmail(email);
//   if (!user) {
//     throw new ErrorInApplication("Invalid email or password!", 401);
//   }
//   if (user.isBlocked) {
//     throw new ErrorInApplication("Your account has been blocked!", 401);
//   }
//   const isPasswordCorrect = await authService.comparePassword(
//     password,
//     user?.password?.toString() || ""
//   );
//   if (!isPasswordCorrect) {
//     throw new ErrorInApplication("Invalid email or password!", 401);
//   }
//   const userDetails = {
//     _id: user?._id.toString(),
//     name: user?.name,
//     username: user?.username,
//     email: user?.email,
//     phone: user?.phone,
//     coverPhoto: user?.coverPhoto,
//     dp: user?.dp,
//     bio: user?.bio,
//     gender: user?.gender,
//     city: user?.city,
//     followers: user?.followers,
//     following: user?.following,
//     isVerifiedAccount: user?.isVerifiedAccount,
//     isBlock: user?.isBlocked,
//   };
//   const refreshToken = authService.generateRefreshToken({userId : user._id.toString() , role : "client"})
//   const accessToken = authService.generateAccessToken({userId : user._id.toString() , role : "client"})
//   await dbUserRepository.addRefreshTokenAndExpiry(email, refreshToken)   // setting the expirry 7days
//   return { userDetails, refreshToken , accessToken };
// };
// ////////////////////////////////////////////////////////////////////////////////
// export const accessTokenRefresh = async (
//   cookies: { refreshToken: string },
//   dbUserRepository: ReturnType<UserDBInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   if (!cookies?.refreshToken) {
//     throw new ErrorInApplication("Invalid token",401);
//   }
//   const refreshToken = cookies.refreshToken;
//   const { userId, role } = authService.verifyRefreshToken(refreshToken.toString());
//   if (!userId || role !== "client") {
//     throw new ErrorInApplication("Invalid token",401);
//   }
//   const user = await dbUserRepository.getUserById(userId);
//   if (!user?.refreshToken || !user?.refreshTokenExpiresAt) {
//     throw new ErrorInApplication("Invalid token!",401);
//   }
//   const expiresAt = user.refreshTokenExpiresAt.getTime();
//   if (!expiresAt || Date.now() > expiresAt) {
//     throw new ErrorInApplication("Invalid token!",401);
//   }
//   const newAccessToken = authService.generateAccessToken({ userId: userId, role: "client" });
//   return newAccessToken;
// };
// ///////////////////////////////////////////////////////////////////////////////
// const tokenVerification = async(token : string ,
//   authService : ReturnType<AuthServiceInterface>
// ) => {
//   const decodedToken = authService.verifyAccessToken(token);
//   if(!decodedToken){
//     throw new ErrorInApplication("Invalid token!",401);
//   }else{
//     return decodedToken
//   }
// }
// ///////////////////////////////////////////////////////////////////////////////
// export const handleLogoutUser = async(userId : string , dbUserRepository : ReturnType<UserDBInterface> ) => {
//   await dbUserRepository.logoutUser(userId)
// } 
// ///////////////////////////////////////////////
// export const handleGoogleLoginOrSignup = async (
//   user: { name: string; email: string ,dp : string },
//   dbUserRepository: ReturnType<UserDBInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   let userDetails;
//   let refreshToken;
//   let accessToken;
//   const existingUser = await dbUserRepository.getUserByEmail(user.email);
//   if (existingUser) {
//     const result = await userLoginUsingGoogle(user, dbUserRepository, authService);
//     userDetails = result.userDetails;
//     refreshToken = result.refreshToken;
//     accessToken = result.accessToken;
//     console.log("if existing user in app usecases: ,  userDetails :", userDetails)
//     console.log("if existing user in app usecases: ,  refreshToken :", refreshToken)
//     console.log("if existing user in app usecases: ,  accessToken :", accessToken)
//   } else {
//     const result = await userRegisterUsingGoogle(user, dbUserRepository, authService);
//     userDetails = result.userDetails;
//     refreshToken = result.refreshToken;
//     accessToken = result.accessToken;
//     console.log("if new user in app usecases: ,  userDetails :", userDetails)
//     console.log("if new user in app usecases: ,  refreshToken :", refreshToken)
//     console.log("if new user in app usecases: ,  accessToken :", accessToken)
//   }
//   return {
//     userDetails,
//     refreshToken,
//     accessToken,
//   };
// };
// export const userRegisterUsingGoogle = async (
//   user: { name: string; email: string, dp:string },
//   dbUserRepository: ReturnType<UserDBInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   try {
//     console.log("................................")
//     console.log("Seperate code running ,userRegisterUsingGoogle  userdetails:", user)
//     console.log("................................")
//     // Generate a username without spaces and random numbers at the end
//     const username = user.name.replace(/\s/g, '') + Math.floor(Math.random() * 100);
//     // Generate a new random password
//     const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//     const newPassword = await authService.encryptPassword(generatedPassword);
// console.log("newPassword : ", newPassword)
//     const userData: GoogleUserInterface = {
//       name: user.name,
//       email: user.email,
//       username: username,
//       password: newPassword,
//       dp : user.dp,
//       isGoogleSignedIn  : true,
//     };
//     const savedUser = await dbUserRepository.addUser(userData);
//     console.log("Resgistered user : " , savedUser)
//     const refreshToken =   authService.generateRefreshToken({ userId: savedUser._id.toString(), role: "client" });
//     const accessToken =   authService.generateAccessToken({ userId: savedUser._id.toString(), role: "client" });
//     const { password: pass, ...rest } = savedUser._doc;
//     return {
//       userDetails: savedUser,
//       refreshToken,
//       accessToken,
//     };
//   } catch (error) {
//     throw new ErrorInApplication("Failed to register user with Google", 500);
//   }
// };
// export const userLoginUsingGoogle = async (
//   user: { name: string; email: string; dp: string },
//   dbUserRepository: ReturnType<UserDBInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   try {
//     console.log("................................");
//     console.log("Separate code running, userLoginUsingGoogle user details:", user);
//     console.log("................................");
//     const existingUser : any = await dbUserRepository.getUserByEmail(user.email);
//     const refreshToken =   authService.generateRefreshToken({ userId: existingUser._id.toString(), role: "client" });
//     const accessToken =   authService.generateAccessToken({ userId: existingUser._id.toString(), role: "client" });
//     return {
//       userDetails: existingUser,
//       refreshToken,
//       accessToken,
//     };
//   } catch (error) {
//     throw new ErrorInApplication("Failed to log in user with Google", 500);
//   }
// };
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
