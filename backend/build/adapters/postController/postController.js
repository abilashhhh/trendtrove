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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const postAuthApplications_1 = require("../../application/use-cases/post/postAuthApplications");
const postController = (userDBRepositoryImplementation, userDBRepositoryInterface, postDBRepositoryImplementation, postDBRepositoryInterface, authServiceImplementation, authenticationServiceInterface) => {
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
    const dbPostRepository = postDBRepositoryInterface(postDBRepositoryImplementation());
    const authService = authenticationServiceInterface(authServiceImplementation());
    const addPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postData = req.body;
        const createPost = yield (0, postAuthApplications_1.handleCreatePost)(postData, dbPostRepository, dbUserRepository);
        res.status(201).json({
            status: "success",
            message: "Post created successfully",
            data: createPost,
        });
    }));
    const updatepost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postData = req.body;
        const createPost = yield (0, postAuthApplications_1.handleupdatepost)(postData, dbPostRepository, dbUserRepository);
        res.status(201).json({
            status: "success",
            message: "Post updated successfully",
            data: createPost,
        });
    }));
    const getpostforuser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.body;
        const getPosts = yield (0, postAuthApplications_1.handleGetPostsForUser)(userId, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Posts fetched for user",
            data: getPosts,
        });
    }));
    const getpostforuserusername = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = req.params;
        const getPosts = yield (0, postAuthApplications_1.handleGetPostsForUserUsername)(username, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Posts fetched for user",
            data: getPosts,
        });
    }));
    const getpostlengthofuser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = req.params;
        const getPostsLength = yield (0, postAuthApplications_1.handleGetLengthForUser)(username, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Posts fetched for user",
            data: getPostsLength,
        });
    }));
    const getpostofcurrentuser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.body;
        const getPosts = yield (0, postAuthApplications_1.handleGetPostsOfCurrentUser)(userId, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Posts fetched for current user",
            data: getPosts,
        });
    }));
    const getsavedpostofcurrentuser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.body;
        const getPosts = yield (0, postAuthApplications_1.handleGetSavedPostsOfCurrentUser)(userId, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Posts fetched for current user",
            data: getPosts,
        });
    }));
    const getparticularpostofcurrentuser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const getPosts = yield (0, postAuthApplications_1.handleGetParticularPost)(id, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Post fetched for current user",
            data: getPosts,
        });
    }));
    const getPostUsingPostId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { postId } = req.params;
        const getPosts = yield (0, postAuthApplications_1.handleGetParticularPost)(postId, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Post fetched for current user",
            postData: getPosts,
        });
    }));
    const reportPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const reportPost = yield (0, postAuthApplications_1.handleReportPosts)(data, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Post reported successfully",
            data: reportPost,
        });
    }));
    const savePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, postId } = req.body;
        const savePost = yield (0, postAuthApplications_1.handleSavePosts)(userId, postId, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Post saved successfully",
            data: savePost,
        });
    }));
    const removesavePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, postId } = req.body;
        const removesavePost = yield (0, postAuthApplications_1.handleRemoveSavePosts)(userId, postId, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Post removed from saved successfully",
            data: removesavePost,
        });
    }));
    const likePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, postId } = req.body;
        const likePost = yield (0, postAuthApplications_1.handleLikePosts)(userId, postId, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Post liked successfully",
            data: likePost,
        });
    }));
    const dislikePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, postId } = req.body;
        const dislikePost = yield (0, postAuthApplications_1.handleDislikePosts)(userId, postId, dbPostRepository);
        res.status(201).json({
            status: "success",
            message: "Post disliked successfully",
            data: dislikePost,
        });
    }));
    const getlikedposts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const likedPosts = yield (0, postAuthApplications_1.handleGetLikedPosts)(userId, dbPostRepository);
        res.status(200).json({ likedPosts });
    }));
    const getdislikedposts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const dislikedPosts = yield (0, postAuthApplications_1.handleGetDislikedPosts)(userId, dbPostRepository);
        res.status(200).json({ dislikedPosts });
    }));
    const getlikesdislikesinfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { postId } = req.params;
        const likesdislikesinfo = yield (0, postAuthApplications_1.handleGetlikesdislikesinfo)(postId, dbPostRepository);
        res.status(200).json({ likesdislikesinfo });
    }));
    const deletepost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { postId } = req.params;
        const deltePostResult = yield (0, postAuthApplications_1.handleDeltePosts)(postId, dbPostRepository);
        res.status(200).json({ deltePostResult });
    }));
    return {
        addPost,
        updatepost,
        getpostforuser,
        getpostforuserusername,
        getpostlengthofuser,
        getpostofcurrentuser,
        getsavedpostofcurrentuser,
        getparticularpostofcurrentuser,
        getPostUsingPostId,
        reportPost,
        savePost,
        removesavePost,
        likePost,
        dislikePost,
        getlikedposts,
        getdislikedposts,
        getlikesdislikesinfo,
        deletepost,
    };
};
exports.default = postController;
