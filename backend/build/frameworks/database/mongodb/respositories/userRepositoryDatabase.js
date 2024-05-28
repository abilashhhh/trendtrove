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
exports.userRepositoryMongoDB = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
//////////////////////////////////////////////////////////
const userRepositoryMongoDB = () => {
    //////////////////////////////////////////////////////////
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Add user tried to run, data : ", user);
            const newUser = new userModel_1.default(user);
            return yield newUser.save();
        }
        catch (error) {
            console.log(error);
            throw new Error("Error adding user!");
        }
    });
    //////////////////////////////////////////////////////////
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findOne({ email });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting user by email!");
        }
    });
    //////////////////////////////////////////////////////////
    const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(userId);
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting user by userId!");
        }
    });
    //////////////////////////////////////////////////////////
    const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("repo ;", username);
            const user = yield userModel_1.default.findOne({ username });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting user by username!");
        }
    });
    //////////////////////////////////////////////////////////
    const logoutUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userModel_1.default.updateOne({
                _id: userId,
            }, { $unset: { refreshToken: 1, refreshTokenExpiresAt: 1 } });
        }
        catch (error) {
            throw new Error("Error logging out user");
        }
    });
    //////////////////////////////////////////////////////////
    const addRefreshTokenAndExpiry = (email, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const user = yield userModel_1.default.findOneAndUpdate({ email }, { refreshToken, refreshTokenExpiresAt }, { new: true });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error adding refresh token and expiry!");
        }
    });
    //////////////////////////////////////////////////////////
    const updateProfile = (profileInfo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(profileInfo._id, profileInfo, {
                new: true,
            });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating profile!");
        }
    });
    const updatePassword = (_id, encryptedNewPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(_id, { password: encryptedNewPassword }, { new: true });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        }
        catch (error) {
            console.error("Error updating password:", error);
            throw new Error("Error updating password!");
        }
    });
    const deleteAccount = (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndDelete(_id);
            return user;
        }
        catch (error) {
            console.error("Error updating password:", error);
            throw new Error("Error updating password!");
        }
    });
    const suspendAccount = (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(_id, { isSuspended: true }, { new: true });
            return user;
        }
        catch (error) {
            console.error("Error suspending account:", error);
            throw new Error("Error suspending account!");
        }
    });
    const blockAccount = (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(_id, { isBlocked: true }, { new: true });
            return user;
        }
        catch (error) {
            console.error("Error blocking account:", error);
            throw new Error("Error blocking account!");
        }
    });
    const unblockAccount = (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(_id, { isBlocked: false }, { new: true });
            return user;
        }
        catch (error) {
            console.error("Error unblocking account:", error);
            throw new Error("Error unblocking account!");
        }
    });
    const privateAccount = (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findByIdAndUpdate(_id, { isPrivate: true }, { new: true });
            return user;
        }
        catch (error) {
            console.error("Error suspending account:", error);
            throw new Error("Error suspending account!");
        }
    });
    const getAllUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.find({
                _id: { $ne: id },
                isAdmin: { $ne: true },
                isBlocked: { $ne: true },
                isSuspended: { $ne: true },
            }, "username dp name bio isPrivate followers following requestedByMe requestsForMe createdAt posts coverPhoto").exec();
            console.log(users);
            return users;
        }
        catch (error) {
            console.error("Error getting all users", error);
            throw new Error("Error getting all users");
        }
    });
    const getAllUsersForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.find({
                isAdmin: { $ne: true },
            }, "username dp name email bio isPrivate isSuspended isBlocked isGoogleSignedIn ").exec();
            console.log(users);
            return users;
        }
        catch (error) {
            console.error("Error getting all users", error);
            throw new Error("Error getting all users");
        }
    });
    const changeIsAccountVerified = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userModel_1.default.updateOne({ email }, {
                $set: {
                    isAccountVerified: true,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error changing isAccountVerified field");
        }
    });
    const changeIsAccountUnverified = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userModel_1.default.updateOne({ _id: userId }, {
                $set: {
                    isAccountVerified: false,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error changing isAccountVerified field");
        }
    });
    const followUser = (currentUserId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentUser = yield userModel_1.default.findById(currentUserId);
            const targetUser = yield userModel_1.default.findById(targetUserId);
            if (!currentUser || !targetUser) {
                throw new Error("User not found");
            }
            if (targetUser.isPrivate) {
                if (!currentUser.requestedByMe.some(user => user.userId.equals(targetUserId))) {
                    currentUser.requestedByMe.push({
                        userId: targetUserId,
                        username: targetUser.username,
                    });
                    targetUser.requestsForMe.push({
                        userId: currentUserId,
                        username: currentUser.username,
                    });
                }
            }
            else {
                if (!currentUser.following.some(user => user.userId.equals(targetUserId))) {
                    currentUser.following.push({
                        userId: targetUserId,
                        username: targetUser.username,
                    });
                    targetUser.followers.push({
                        userId: currentUserId,
                        username: currentUser.username,
                    });
                }
            }
            yield currentUser.save();
            yield targetUser.save();
            return { message: "You are now following this user" };
        }
        catch (error) {
            console.error("Error in makeUserAFollower", error);
            throw new Error("Error in makeUserAFollower");
        }
    });
    const unfollowUser = (currentUserId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentUser = yield userModel_1.default.findById(currentUserId);
            const targetUser = yield userModel_1.default.findById(targetUserId);
            if (!currentUser || !targetUser) {
                throw new Error("User not found");
            }
            currentUser.following = currentUser.following.filter(user => !user.userId.equals(targetUserId));
            targetUser.followers = targetUser.followers.filter(user => !user.userId.equals(currentUserId));
            yield currentUser.save();
            yield targetUser.save();
            console.log("Unfollow successful");
            return { message: "You have unfollowed this user" };
        }
        catch (error) {
            console.error("Error in unfollowUser", error);
            throw new Error("Error in unfollowing the user");
        }
    });
    const cancelSendFriendRequest = (currentUserId, requesterUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentUser = yield userModel_1.default.findById(currentUserId);
            const requesterUser = yield userModel_1.default.findById(requesterUserId);
            if (!currentUser || !requesterUser) {
                throw new Error("User not found");
            }
            currentUser.requestsForMe = currentUser.requestsForMe.filter(user => !user.userId.equals(requesterUserId));
            requesterUser.requestedByMe = requesterUser.requestedByMe.filter(user => !user.userId.equals(currentUserId));
            yield currentUser.save();
            yield requesterUser.save();
            console.log("Unfollow successful");
            return { message: "You have cancelled the friend request sent" };
        }
        catch (error) {
            console.error("Error in cancelSendFriendRequest", error);
            throw new Error("Error in cancelling the send friend request");
        }
    });
    const acceptFriendRequest = (currentUserId, requesterUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentUser = yield userModel_1.default.findById(currentUserId);
            const requesterUser = yield userModel_1.default.findById(requesterUserId);
            if (!currentUser || !requesterUser) {
                throw new Error("User not found");
            }
            currentUser.requestsForMe = currentUser.requestsForMe.filter(user => !user.userId.equals(requesterUserId));
            requesterUser.requestedByMe = requesterUser.requestedByMe.filter(user => !user.userId.equals(currentUserId));
            currentUser.followers.push({
                userId: requesterUserId,
                username: requesterUser.username,
            });
            requesterUser.following.push({
                userId: currentUserId,
                username: currentUser.username,
            });
            yield currentUser.save();
            yield requesterUser.save();
            console.log("Follow request accepted");
            return { message: "Follow request accepted" };
        }
        catch (error) {
            console.error("Error in acceptFriendRequest", error);
            throw new Error("Error in accepting the friend request");
        }
    });
    const rejectFriendRequest = (currentUserId, requesterUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentUser = yield userModel_1.default.findById(currentUserId);
            const requesterUser = yield userModel_1.default.findById(requesterUserId);
            if (!currentUser || !requesterUser) {
                throw new Error("User not found");
            }
            currentUser.requestsForMe = currentUser.requestsForMe.filter(user => !user.userId.equals(requesterUserId));
            requesterUser.requestedByMe = requesterUser.requestedByMe.filter(user => !user.userId.equals(currentUserId));
            yield currentUser.save();
            yield requesterUser.save();
            console.log("Follow request rejected");
            return { message: "Follow request rejected" };
        }
        catch (error) {
            console.error("Error in rejectFriendRequest", error);
            throw new Error("Error in rejecting the friend request");
        }
    });
    const clearAll = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield userModel_1.default.updateMany({}, {
                $set: {
                    requestsForMe: [],
                    requestedByMe: [],
                    followers: [],
                    following: [],
                },
            });
            console.log(`Cleared data for  users.`);
        }
        catch (error) {
            console.error("Error clearing data:", error);
        }
    });
    // clearAll();
    //////////////////////////////////////////////////////
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
    ////////////////////////////////////////////////
    return {
        addUser,
        getUserByEmail,
        getUserById,
        getUserByUsername,
        addRefreshTokenAndExpiry,
        logoutUser,
        updateProfile,
        updatePassword,
        changeIsAccountVerified,
        changeIsAccountUnverified,
        deleteAccount,
        suspendAccount,
        privateAccount,
        getAllUsers,
        getAllUsersForAdmin,
        blockAccount,
        unblockAccount,
        followUser,
        unfollowUser,
        cancelSendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        addNewPost
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
