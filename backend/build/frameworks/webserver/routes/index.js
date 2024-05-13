"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const routes = (app) => {
    // DUMMY DATA FOR TESTING
    app.get('/', (req, res) => {
        res.send("Hello World");
    });
    app.use('/api/auth', (0, auth_1.default)());
};
exports.default = routes;
