"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongodb/connection"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const errorHandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandlingMiddleware"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const app = (0, express_1.default)();
(0, connection_1.default)(); // MongoDB setup
(0, express_2.default)(app); // Express setup
(0, routes_1.default)(app); // Routes for each endpoint
app.use(errorHandlingMiddleware_1.default); // Middleware - error handling
app.all('*', (req, res, next) => {
    next(new Error("Request not found"));
});
(0, server_1.default)(app);
