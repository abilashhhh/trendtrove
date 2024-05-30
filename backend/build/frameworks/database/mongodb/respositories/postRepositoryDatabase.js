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
exports.postRepositoryMongoDB = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const reportPostModel_1 = __importDefault(require("../models/reportPostModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const likePostModel_1 = __importDefault(require("../models/likePostModel"));
const dislikePostModel_1 = __importDefault(require("../models/dislikePostModel"));
//////////////////////////////////////////////////////////
const postRepositoryMongoDB = () => {
    //////////////////////////////////////////////////////////
    const addNewPost = (postData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPost = new postModel_1.default(postData);
            return yield newPost.save();
        }
        catch (error) {
            console.log(error);
            throw new Error("Error adding new post!");
        }
    });
    const getAllPostsForUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requesterUser = yield userModel_1.default.findById(id);
            if (!requesterUser) {
                throw new Error("User not found");
            }
            const followingOfRequestedUser = yield userModel_1.default.findById(id, {
                following: 1,
            }).exec();
            // console.log("followingOfRequestedUser: ", followingOfRequestedUser)
            if (!followingOfRequestedUser || !followingOfRequestedUser.following) {
                throw new Error("User not following anyone");
            }
            const followingUsersId = followingOfRequestedUser.following.map(follow => follow.userId);
            // console.log("followingUsersId Id s : ", followingUsersId)
            const userIdsToFetch = [...followingUsersId, id];
            console.log("User ids to fetch posts for:", userIdsToFetch);
            const gettingPosts = yield postModel_1.default.find({
                userId: { $in: userIdsToFetch },
            }).sort({ createdAt: -1 });
            console.log("Getting posts beefore returning:", gettingPosts);
            return gettingPosts;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting all posts for user!");
        }
    });
    const reportPostsForUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPeport = new reportPostModel_1.default(data);
            return yield newPeport.save();
        }
        catch (error) {
            console.log(error);
            throw new Error("Error reporting new post!");
        }
    });
    const savePostsForUser = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Data in postRepository, userId, postId: ", userId, postId);
            const user = yield userModel_1.default.findById(userId);
            if (!user)
                throw new Error('User not found');
            if (!user.savedPosts.includes(postId)) {
                user.savedPosts.push(postId);
                yield user.save();
                console.log('Post saved successfully');
            }
            else {
                console.log('Post already saved');
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("Error saving post!");
        }
    });
    const likePostsForUser = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield dislikePostModel_1.default.findOneAndDelete({ userId, postId });
            const like = new likePostModel_1.default({ userId, postId });
            yield like.save();
            console.log('Post liked successfully!');
        }
        catch (error) {
            console.error(error);
            throw new Error("Error liking post!");
        }
    });
    const dislikePostsForUser = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield likePostModel_1.default.findOneAndDelete({ userId, postId });
            const dislike = new dislikePostModel_1.default({ userId, postId });
            yield dislike.save();
            console.log('Post disliked successfully!');
        }
        catch (error) {
            console.error(error);
            throw new Error("Error disliking post!");
        }
    });
    ////////////////////////////////////////////////
    return {
        addNewPost,
        getAllPostsForUser,
        reportPostsForUser,
        savePostsForUser,
        likePostsForUser,
        dislikePostsForUser
    };
};
exports.postRepositoryMongoDB = postRepositoryMongoDB;
