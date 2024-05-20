"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./authRoutes"));
const profileRoutes_1 = __importDefault(require("./profileRoutes"));
const routes = (app) => {
    app.use("/api/auth", (0, authRoutes_1.default)());
    app.use("/api/profile", (0, profileRoutes_1.default)());
};
exports.default = routes;
