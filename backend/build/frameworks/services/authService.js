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
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const authService = () => {
    const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        return hashedPassword;
    });
    const comparePassword = (password, hashedPassword) => {
        return bcryptjs_1.default.compare(password, hashedPassword);
    };
    const generateAccessToken = (payload) => {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_ACCESS_CODE, {
            expiresIn: "15m",
        });
        return accessToken;
    };
    const generateRefreshToken = (payload) => {
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_REFRESH_CODE, {
            expiresIn: "15m",
        });
        return refreshToken;
    };
    const verifyAccessToken = (token) => {
        try {
            const payload = jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_CODE);
            return payload;
        }
        catch (error) {
            throw new Error("Invalid access token");
        }
    };
    const verifyRefreshToken = (token) => {
        try {
            const payload = jsonwebtoken_1.default.verify(token, config_1.default.JWT_REFRESH_CODE);
            return payload;
        }
        catch (error) {
            throw new Error("Invalid refresh token");
        }
    };
    return {
        encryptPassword,
        comparePassword,
        generateAccessToken,
        generateRefreshToken,
        verifyAccessToken,
        verifyRefreshToken,
    };
};
exports.authService = authService;
