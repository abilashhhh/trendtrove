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
exports.postDBRepository = void 0;
const postDBRepository = (repository) => {
    const addNewPost = (postData) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.addNewPost(postData);
    });
    const updatePost = (postData) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.updatePost(postData);
    });
    const getAllPostsForUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllPostsForUser(id); });
    const getAllPostsForCurrentUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllPostsForCurrentUser(id); });
    const getAllSavedPostsForCurrentUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllSavedPostsForCurrentUser(id); });
    const getParticularPostsForCurrentUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getParticularPostsForCurrentUser(id); });
    const reportPostsForUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.reportPostsForUser(id); });
    const savePostsForUser = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.savePostsForUser(userId, postId); });
    const likePostsForUser = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.likePostsForUser(userId, postId); });
    const dislikePostsForUser = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.dislikePostsForUser(userId, postId); });
    const getLikedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getLikedPosts(userId); });
    const getDislikedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getDislikedPosts(userId); });
    const getlikesdislikesInfo = (postId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getlikesdislikesInfo(postId); });
    const deltePostForUser = (postId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deltePostForUser(postId); });
    return {
        addNewPost,
        updatePost,
        getAllPostsForUser,
        getAllPostsForCurrentUser,
        getAllSavedPostsForCurrentUser,
        getParticularPostsForCurrentUser,
        reportPostsForUser,
        savePostsForUser,
        likePostsForUser,
        dislikePostsForUser,
        getLikedPosts,
        getDislikedPosts,
        getlikesdislikesInfo,
        deltePostForUser
    };
};
exports.postDBRepository = postDBRepository;
