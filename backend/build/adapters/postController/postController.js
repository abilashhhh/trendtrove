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
    const updatepost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postData = req.body;
            console.log(postData);
            const createPost = yield (0, postAuthApplications_1.handleupdatepost)(postData, dbPostRepository, dbUserRepository);
            res.status(201).json({
                status: "success",
                message: "post updated successfully",
                data: createPost,
            });
        }
        catch (error) {
            console.error("Error updating post:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to update post info",
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
    const getpostofcurrentuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log(" getpostofcurrentuserId received from frontend:", id);
            const getPosts = yield (0, postAuthApplications_1.handleGetPostsOfCurrentUser)(id, dbPostRepository);
            console.log('getPosts:', getPosts);
            res.status(201).json({
                status: "success",
                message: "Posts fetched for current user",
                data: getPosts,
            });
        }
        catch (error) {
            console.error("Error getting all posts of current user:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to get all posts",
            });
        }
    });
    const getsavedpostofcurrentuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log(" getsavedpostofcurrentuser received from frontend:", id);
            const getPosts = yield (0, postAuthApplications_1.handleGetSavedPostsOfCurrentUser)(id, dbPostRepository);
            console.log('getPosts:', getPosts);
            res.status(201).json({
                status: "success",
                message: "Posts fetched for current user",
                data: getPosts,
            });
        }
        catch (error) {
            console.error("Error getting all saved posts of current user:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to get all posts",
            });
        }
    });
    const getparticularpostofcurrentuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log(" getparticularpostofcurrentuser received from frontend:", id);
            const getPosts = yield (0, postAuthApplications_1.handleGetParticularPost)(id, dbPostRepository);
            console.log('getPosts:', getPosts);
            res.status(201).json({
                status: "success",
                message: "Posts fetched for current user",
                data: getPosts,
            });
        }
        catch (error) {
            console.error("Error getting all posts of current user:", error);
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
                message: "Posts saved successfully",
                data: savePost,
            });
        }
        catch (error) {
            console.error("Error reporting posts for user:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to save posts",
            });
        }
    });
    const removesavePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, postId } = req.body;
            console.log("removesavePost data received from frontend:", userId, postId);
            const removesavePost = yield (0, postAuthApplications_1.handleRemoveSavePosts)(userId, postId, dbPostRepository);
            console.log('removesavePost:', removesavePost);
            res.status(201).json({
                status: "success",
                message: "Posts removed from saved successfully",
                data: removesavePost,
            });
        }
        catch (error) {
            console.error("Error removing posts from saved:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to remove from saved posts",
            });
        }
    });
    const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, postId } = req.body;
            console.log("likePost data received from frontend:", userId, postId);
            const likePost = yield (0, postAuthApplications_1.handleLikePosts)(userId, postId, dbPostRepository);
            console.log('likePost:', likePost);
            res.status(201).json({
                status: "success",
                message: "Posts liked successfully",
                data: likePost,
            });
        }
        catch (error) {
            console.error("Error liking posts for user:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to like posts",
            });
        }
    });
    const dislikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, postId } = req.body;
            console.log("dislikePost data received from frontend:", userId, postId);
            const dislikePost = yield (0, postAuthApplications_1.handleDislikePosts)(userId, postId, dbPostRepository);
            console.log('dislikePost:', dislikePost);
            res.status(201).json({
                status: "success",
                message: "Posts disliked successfully",
                data: dislikePost,
            });
        }
        catch (error) {
            console.error("Error disliking posts for user:", error);
            res.status(401).json({
                status: "error",
                message: "Failed to dislike posts",
            });
        }
    });
    const getlikedposts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            console.log("Req.params on getlikedposts: ", req.params);
            console.log("getlikedposts data received from frontend:", userId);
            const likedPosts = yield (0, postAuthApplications_1.handleGetLikedPosts)(userId, dbPostRepository);
            console.log('Liked posts:', likedPosts);
            res.status(200).json({ likedPosts });
        }
        catch (error) {
            console.error("Error getting liked posts for user:", error);
            res.status(500).json({ error: "Failed to get liked posts" });
        }
    });
    const getdislikedposts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            console.log("Req.params on getdislikedposts: ", req.params);
            console.log("getdislikedposts data received from frontend:", userId);
            const dislikedPosts = yield (0, postAuthApplications_1.handleGetDislikedPosts)(userId, dbPostRepository);
            console.log('Disliked posts:', dislikedPosts);
            res.status(200).json({ dislikedPosts });
        }
        catch (error) {
            console.error("Error getting disliked posts for user:", error);
            res.status(500).json({ error: "Failed to get disliked posts" });
        }
    });
    const getlikesdislikesinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { postId } = req.params;
            console.log("getlikesdislikesinfo data received from frontend:", postId);
            const likesdislikesinfo = yield (0, postAuthApplications_1.handleGetlikesdislikesinfo)(postId, dbPostRepository);
            console.log('likesdislikesinfo:', likesdislikesinfo);
            res.status(200).json({ likesdislikesinfo });
        }
        catch (error) {
            console.error("Error getting likesdislikesinfo for posts :", error);
            res.status(500).json({ error: "Failed to get likesdislikesinfo for posts" });
        }
    });
    const deletepost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { postId } = req.params;
            console.log("deletepost data received from frontend:", postId);
            const deltePostResult = yield (0, postAuthApplications_1.handleDeltePosts)(postId, dbPostRepository);
            console.log('deltePostResult:', deltePostResult);
            res.status(200).json({ deltePostResult });
        }
        catch (error) {
            console.error("Error getting deltePostResult for posts :", error);
            res.status(500).json({ error: "Failed to get deltePostResult" });
        }
    });
    return {
        addPost,
        updatepost,
        getpostforuser,
        getpostofcurrentuser,
        getsavedpostofcurrentuser,
        getparticularpostofcurrentuser,
        reportPost,
        savePost,
        removesavePost,
        likePost,
        dislikePost,
        getlikedposts,
        getdislikedposts,
        getlikesdislikesinfo,
        deletepost
    };
};
exports.default = postController;
