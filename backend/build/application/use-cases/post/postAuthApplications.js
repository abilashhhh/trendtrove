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
exports.handleDeltePosts = exports.handleGetlikesdislikesinfo = exports.handleGetDislikedPosts = exports.handleGetLikedPosts = exports.handleDislikePosts = exports.handleLikePosts = exports.handleSavePosts = exports.handleReportPosts = exports.handleGetPostsOfCurrentUser = exports.handleGetPostsForUser = exports.handleCreatePost = void 0;
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
        const newPostData = Object.assign(Object.assign({}, postData), { username: userData === null || userData === void 0 ? void 0 : userData.username, dp: userData === null || userData === void 0 ? void 0 : userData.dp });
        console.log("User exists....");
        const newPost = yield dbPostRepository.addNewPost(newPostData);
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
    }
});
exports.handleGetPostsForUser = handleGetPostsForUser;
const handleGetPostsOfCurrentUser = (id, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleGetPostsOfCurrentUser reached");
        if (!id) {
            throw new ErrorInApplication_1.default("User ID is required to get all posts", 400);
        }
        const allPostsForUser = yield dbPostRepository.getAllPostsForCurrentUser(id);
        console.log("All posts from handleGetPostsOfCurrentUser :", allPostsForUser);
        return allPostsForUser;
    }
    catch (error) {
        console.log("Error in handleGetPostsOfCurrentUser");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get all  posts of current user", 500);
    }
});
exports.handleGetPostsOfCurrentUser = handleGetPostsOfCurrentUser;
const handleReportPosts = (data, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleReportPosts reached");
        if (!data.postId) {
            throw new ErrorInApplication_1.default("Post ID is required to report post", 400);
        }
        const reportPostsForUser = yield dbPostRepository.reportPostsForUser(data);
        console.log("All posts from reportPostsForUser :", reportPostsForUser);
        return reportPostsForUser;
    }
    catch (error) {
        console.log("Error in handleGetPostsForUser");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get all posts", 500);
    }
});
exports.handleReportPosts = handleReportPosts;
const handleSavePosts = (userId, postId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleSavePosts reached");
        if (!postId) {
            throw new ErrorInApplication_1.default("Post ID and user id is required to save post", 400);
        }
        const savePostsForUser = yield dbPostRepository.savePostsForUser(userId, postId);
        console.log("All posts from savePostsForUser :", savePostsForUser);
        return savePostsForUser;
    }
    catch (error) {
        console.log("Error in savePostsForUser");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to save posts", 500);
    }
});
exports.handleSavePosts = handleSavePosts;
const handleLikePosts = (userId, postId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleSavePosts reached");
        if (!postId) {
            throw new ErrorInApplication_1.default("Post ID and user id is required to like post", 400);
        }
        const handleLikePostsForUser = yield dbPostRepository.likePostsForUser(userId, postId);
        console.log("All posts from handleLikePostsForUser :", handleLikePostsForUser);
        return handleLikePostsForUser;
    }
    catch (error) {
        console.log("Error in handleLikePosts");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to like posts", 500);
    }
});
exports.handleLikePosts = handleLikePosts;
const handleDislikePosts = (userId, postId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleDislikePosts reached");
        if (!postId) {
            throw new ErrorInApplication_1.default("Post ID and user id is required to dislike post", 400);
        }
        const handleDislikePostsForUser = yield dbPostRepository.dislikePostsForUser(userId, postId);
        console.log("All posts from handleDislikePostsForUser :", handleDislikePostsForUser);
        return handleDislikePostsForUser;
    }
    catch (error) {
        console.log("Error in handleDislikePostsForUser");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to dislike posts", 500);
    }
});
exports.handleDislikePosts = handleDislikePosts;
const handleGetLikedPosts = (userId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleGetLikedPosts reached");
        const handleGetLikedPosts = yield dbPostRepository.getLikedPosts(userId);
        console.log("All posts from handleGetLikedPosts :", handleGetLikedPosts);
        return handleGetLikedPosts;
    }
    catch (error) {
        console.log("Error in handleGetLikedPosts");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get liked posts", 500);
    }
});
exports.handleGetLikedPosts = handleGetLikedPosts;
const handleGetDislikedPosts = (userId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleGetDislikedPosts reached");
        const handleGetDislikedPosts = yield dbPostRepository.getDislikedPosts(userId);
        console.log("All posts from handleGetDislikedPosts :", handleGetDislikedPosts);
        return handleGetDislikedPosts;
    }
    catch (error) {
        console.log("Error in handleGetDislikedPosts");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get liked posts", 500);
    }
});
exports.handleGetDislikedPosts = handleGetDislikedPosts;
const handleGetlikesdislikesinfo = (postId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleGetlikesdislikesinfo reached");
        const handleGetlikesdislikesinfo = yield dbPostRepository.getlikesdislikesInfo(postId);
        console.log("All posts from handleGetlikesdislikesinfo :", handleGetlikesdislikesinfo);
        return handleGetlikesdislikesinfo;
    }
    catch (error) {
        console.log("Error in handleGetlikesdislikesinfo");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get liked posts", 500);
    }
});
exports.handleGetlikesdislikesinfo = handleGetlikesdislikesinfo;
const handleDeltePosts = (postId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("handleDeltePosts reached");
        const handleDeltePostsForUser = yield dbPostRepository.deltePostForUser(postId);
        console.log("All posts from handleDeltePostsForUser :", exports.handleGetlikesdislikesinfo);
        return handleDeltePostsForUser;
    }
    catch (error) {
        console.log("Error in handleDeltePostsForUser");
        if (error instanceof ErrorInApplication_1.default) {
            throw error;
        }
        throw new ErrorInApplication_1.default("Failed to get delete posts", 500);
    }
});
exports.handleDeltePosts = handleDeltePosts;
