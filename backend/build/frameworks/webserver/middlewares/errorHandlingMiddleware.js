"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlingMiddleware = (err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
};
exports.default = errorHandlingMiddleware;
