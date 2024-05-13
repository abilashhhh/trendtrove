"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configurationKeys = {
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB,
    JWT_ACCESS_CODE: process.env.JWT_ACCESS_CODE,
    JWT_REFRESH_CODE: process.env.JWT_REFRESH_CODE,
};
exports.default = configurationKeys;
