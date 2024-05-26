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
    // CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    // CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    // CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};
exports.default = configurationKeys;
