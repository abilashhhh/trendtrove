"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: 'http://localhost:5173', //  frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
const expressConfigurations = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)(corsOptions));
};
exports.default = expressConfigurations;
