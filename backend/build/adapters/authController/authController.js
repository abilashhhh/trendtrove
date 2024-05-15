"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorInApplication_1 = __importDefault(require("../../utils/ErrorInApplication"));
// use cases
const userAuth_1 = require("../../application/use-cases/auth/userAuth");
const authController = (authServiceImplementation, authServiceInterface, userDBRepositoryImplementation, userDBRepositoryInterface) => {
    const authService = authServiceInterface(authServiceImplementation());
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const user = req.body;
        try {
            yield (0, userAuth_1.userRegister)(user, dbUserRepository, authService);
            res.status(200).json({
                status: "success",
                message: "User registered successfully"
            });
        }
        catch (error) {
            console.error("Error registering user:", error);
            if (error instanceof ErrorInApplication_1.default) {
                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message
                });
            }
            else {
                res.status(500).json({
                    status: "error",
                    message: "Failed to register the user"
                });
            }
        }
    });
    return {
        registerUser
    };
};
exports.default = authController;
