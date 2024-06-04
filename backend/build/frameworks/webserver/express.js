"use strict";
//     import cookieParser from "cookie-parser";
// import express ,{ Application, NextFunction} from "express"
// import cors from "cors";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const corsOptions = {
//     origin: 'http://localhost:5173', //  frontend URL
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   };
//     const expressConfigurations = (app: Application) => {
//         app.use(express.json());
//         app.use(express.urlencoded({extended : true}))
//         app.use(cookieParser())
//         app.use(cors(corsOptions))
//     }
//     export default expressConfigurations
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("../../config"));
const expressConfig = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    const corsOptions = {
        origin: ["*", config_1.default.CLIENT_URL],
    };
    app.use((0, cors_1.default)(Object.assign({ credentials: true }, corsOptions)));
};
exports.default = expressConfig;
