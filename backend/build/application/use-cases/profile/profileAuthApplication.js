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
exports.handleUserInfo = void 0;
const ErrorInApplication_1 = __importDefault(require("../../../utils/ErrorInApplication"));
const handleUserInfo = (userId, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleUserInfo runned profile usecase");
        const userData = yield dbUserRepository.getUserById(userId);
        if (!userData) {
            throw new Error("User not found!");
        }
        const user = {
            _id: userData._id.toString(),
            name: userData.name,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            dp: userData.dp,
            coverPhoto: userData.coverPhoto,
            bio: userData.bio,
            gender: userData.gender,
            city: userData.city,
            followers: userData.followers,
            following: userData.following,
            isVerifiedAccount: userData.isVerifiedAccount,
            notifications: userData.notifications,
        };
        return user;
    }
    catch (err) {
        console.log("error : ", err);
        throw new ErrorInApplication_1.default("User not found!", 401);
    }
});
exports.handleUserInfo = handleUserInfo;
