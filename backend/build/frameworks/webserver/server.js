"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const serverConfigurations = (app) => {
    app.listen(config_1.default.PORT, () => {
        console.log(`Server listening on Port ${config_1.default.PORT}`);
    });
};
exports.default = serverConfigurations;
