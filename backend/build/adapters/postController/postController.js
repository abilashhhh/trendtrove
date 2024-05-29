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
const postController = (userDBRepositoryImplementation, userDBRepositoryInterface, postDBRepositoryImplementation, postDBRepositoryInterface, authServiceImplementation, authenticationServiceInterface) => {
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const dbPostRepository = postDBRepositoryInterface(postDBRepositoryImplementation());
    const authService = authenticationServiceInterface(authServiceImplementation());
    const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postData = req.body;
            console.log(postData);
            const createPost = yield (0, postAuthApplications_1.handleCreatePost)(postData, dbPostRepository, dbUserRepository);
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
    const getpostforuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log("Id received from frontend:", id);
            const getPosts = yield (0, postAuthApplications_1.handleGetPostsForUser)(id, dbPostRepository);
            console.log('getPosts:', getPosts);
            res.status(201).json({
                status: "success",
                message: "Posts fetched for user",
                data: getPosts,
            });
        }
        catch (error) {
            console.error("Error getting all posts for user:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to get all posts",
            });
        }
    });
    const reportPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log("reportPost data received from frontend:", data);
            const reportPost = yield (0, postAuthApplications_1.handleReportPosts)(data, dbPostRepository);
            console.log('reportPost:', reportPost);
            res.status(201).json({
                status: "success",
                message: "Posts reported successfully",
                data: reportPost,
            });
        }
        catch (error) {
            console.error("Error reporting posts for user:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to report posts",
            });
        }
    });
    const savePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, postId } = req.body;
            console.log("savePost data received from frontend:", userId, postId);
            const savePost = yield (0, postAuthApplications_1.handleSavePosts)(userId, postId, dbPostRepository);
            console.log('savePost:', savePost);
            res.status(201).json({
                status: "success",
                message: "Posts reported successfully",
                data: savePost,
            });
        }
        catch (error) {
            console.error("Error reporting posts for user:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to report posts",
            });
        }
    });
    return {
        addPost,
        getpostforuser,
        reportPost,
        savePost
    };
};
exports.default = postController;
