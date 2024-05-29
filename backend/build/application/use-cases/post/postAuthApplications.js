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
exports.handleGetPostsForUser = exports.handleCreatePost = void 0;
const ErrorInApplication_1 = __importDefault(require("../../../utils/ErrorInApplication"));
const handleCreatePost = (postData, dbPostRepository, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Post data in handleCreatePost:", postData);
        if (!postData.userId) {
            throw new ErrorInApplication_1.default("User ID is required to create a post", 400);
        }
        const userData = yield dbUserRepository.getUserById(postData.userId);
        if (!userData) {
            throw new ErrorInApplication_1.default("User not found", 404);
        }
        console.log("User exists....");
        const newPost = yield dbPostRepository.addNewPost(postData);
        console.log("New post data:", newPost);
        return newPost;
    }
    catch (error) {
        console.error("Error in handleCreatePost:", error);
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to create post", 500);
    }
});
exports.handleCreatePost = handleCreatePost;
const handleGetPostsForUser = (id, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleGetPostsForUser reached");
        if (!id) {
            throw new ErrorInApplication_1.default("User ID is required to get all posts", 400);
        }
        const allPostsForUser = yield dbPostRepository.getAllPostsForUser(id);
        console.log("All posts from handleGetPostsForuser :", allPostsForUser);
        return allPostsForUser;
    }
    catch (error) {
        console.log("Error in handleGetPostsForUser");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get all posts", 500);
        return;
    }
});
exports.handleGetPostsForUser = handleGetPostsForUser;
