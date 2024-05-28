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
Object.defineProperty(exports, "__esModule", { value: true });
const postAuthApplications_1 = require("../../application/use-cases/post/postAuthApplications");
const postController = (userDBRepositoryImplementation, userDBRepositoryInterface, authServiceImplementation, authenticationServiceInterface) => {
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const authService = authenticationServiceInterface(authServiceImplementation());
    const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postData = req.body;
            console.log(postData);
            const createPost = yield (0, postAuthApplications_1.handleCreatePost)(postData, dbUserRepository);
            res.status(201).json({
                status: "success",
                message: "post created successfully",
                data: createPost,
            });
        }
        catch (error) {
            console.error("Error adding new post:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to add new post info",
            });
        }
    });
    return {
        addPost,
    };
};
exports.default = postController;
