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
exports.otpRepositoryMongoDB = void 0;
const otpModel_1 = __importDefault(require("../models/otpModel"));
const otpRepositoryMongoDB = () => {
    const saveNewOtp = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, otp }) {
        try {
            const otpObj = new otpModel_1.default({ email, otp });
            const savedOtp = yield otpObj.save();
            return savedOtp;
        }
        catch (err) {
            console.log(err);
            throw new Error("Error in saving otp!");
        }
    });
    const getLatestOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const otpObj = yield otpModel_1.default.findOne({ email }).sort({ createdAt: -1 });
            return otpObj;
        }
        catch (err) {
            console.log(err);
            throw new Error("Error in getting otp!");
        }
    });
    return {
        saveNewOtp,
        getLatestOtp,
    };
};
exports.otpRepositoryMongoDB = otpRepositoryMongoDB;
