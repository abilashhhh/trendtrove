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
const ErrorInApplication_1 = __importDefault(require("./utils/ErrorInApplication"));
const app = (0, express_1.default)();
(0, connection_1.default)();
(0, express_2.default)(app);
(0, routes_1.default)(app);
app.all("*", (req, res, next) => {
    next(new ErrorInApplication_1.default("Request not found", 404));
});
app.use(errorHandlingMiddleware_1.default);
(0, server_1.default)(app);
