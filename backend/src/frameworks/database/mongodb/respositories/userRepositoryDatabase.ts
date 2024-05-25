import { ProfileInterface } from "../../../../types/profileInterface";
import {
  GoogleUserInterface,
  UserInterface,
} from "../../../../types/userInterface";

import User from "../models/userModel";

//////////////////////////////////////////////////////////

export const userRepositoryMongoDB = () => {
  //////////////////////////////////////////////////////////

  const addUser = async (user: UserInterface | GoogleUserInterface) => {
    try {
      console.log("Add user tried to run, data : ", user);

      const newUser = new User(user);
      return await newUser.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error adding user!");
    }
  };

  //////////////////////////////////////////////////////////

  const getUserByEmail = async (email: string) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting user by email!");
    }
  };

  //////////////////////////////////////////////////////////

  const getUserById = async (userId: string) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting user by userId!");
    }
  };

  //////////////////////////////////////////////////////////

  const getUserByUsername = async (username: string) => {
    try {
      console.log("repo ;", username);
      const user = await User.findOne({ username });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting user by username!");
    }
  };

  //////////////////////////////////////////////////////////

  const logoutUser = async (userId: string) => {
    try {
      await User.updateOne(
        {
          _id: userId,
        },
        { $unset: { refreshToken: 1, refreshTokenExpiresAt: 1 } }
      );
    } catch (error) {
      throw new Error("Error logging out user");
    }
  };

  //////////////////////////////////////////////////////////

  const addRefreshTokenAndExpiry = async (
    email: string,
    refreshToken: string
  ) => {
    try {
      const refreshTokenExpiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      );
      const user = await User.findOneAndUpdate(
        { email },
        { refreshToken, refreshTokenExpiresAt },
        { new: true }
      );
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error adding refresh token and expiry!");
    }
  };

  //////////////////////////////////////////////////////////
  const updateProfile = async (profileInfo: ProfileInterface) => {
    try {
      const user = await User.findByIdAndUpdate(profileInfo._id, profileInfo, {
        new: true,
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating profile!");
    }
  };

  const updatePassword = async (_id: string, encryptedNewPassword: string) => {
    try {
      const user = await User.findByIdAndUpdate(
        _id,
        { password: encryptedNewPassword },
        { new: true }
      );

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      console.error("Error updating password:", error);
      throw new Error("Error updating password!");
    }
  };

  const deleteAccount = async (_id: string) => {
    try {
      const user = await User.findByIdAndDelete(_id);

      return user;
    } catch (error) {
      console.error("Error updating password:", error);
      throw new Error("Error updating password!");
    }
  };

  const suspendAccount = async (_id: string) => {
    try {
      const user = await User.findByIdAndUpdate(
        _id,
        { isSuspended: true },
        { new: true }
      );

      return user;
    } catch (error) {
      console.error("Error suspending account:", error);
      throw new Error("Error suspending account!");
    }
  };

  const blockAccount = async (_id: string) => {
    try {
      const user = await User.findByIdAndUpdate(
        _id,
        { isBlocked: true },
        { new: true }
      );

      return user;
    } catch (error) {
      console.error("Error blocking account:", error);
      throw new Error("Error blocking account!");
    }
  };

  const unblockAccount = async (_id: string) => {
    try {
      const user = await User.findByIdAndUpdate(
        _id,
        { isBlocked: false },
        { new: true }
      );

      return user;
    } catch (error) {
      console.error("Error unblocking account:", error);
      throw new Error("Error unblocking account!");
    }
  };

  const privateAccount = async (_id: string) => {
    try {
      const user = await User.findByIdAndUpdate(
        _id,
        { isPrivate: true },
        { new: true }
      );

      return user;
    } catch (error) {
      console.error("Error suspending account:", error);
      throw new Error("Error suspending account!");
    }
  };

  const getAllUsers = async (id: string) => {
    try {
      const users = await User.find(
        {
          _id: { $ne: id },
          isAdmin: { $ne: true },
          isBlocked: { $ne: true },
          isSuspended: { $ne: true },
        },
        "username dp name bio isPrivate followers following requestedByMe requestsForMe "
      ).exec();
      console.log(users);
      return users;
    } catch (error) {
      console.error("Error getting all users", error);
      throw new Error("Error getting all users");
    }
  };

  const getAllUsersForAdmin = async () => {
    try {
      const users = await User.find(
        {
          isAdmin: { $ne: true },
        },
        "username dp name email bio isPrivate isSuspended isBlocked isGoogleSignedIn "
      ).exec();
      console.log(users);
      return users;
    } catch (error) {
      console.error("Error getting all users", error);
      throw new Error("Error getting all users");
    }
  };

  const changeIsAccountVerified = async (email: string) => {
    try {
      await User.updateOne(
        { email },
        {
          $set: {
            isAccountVerified: true,
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("Error changing isAccountVerified field");
    }
  };

  const changeIsAccountUnverified = async (userId: string) => {
    try {
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            isAccountVerified: false,
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("Error changing isAccountVerified field");
    }
  };

  const sendFriendRequest = async (userId: string, targetUserId: string) => {
    try {
      const user = await User.findById(userId);
      const targetUser = await User.findById(targetUserId);

      if (!user || !targetUser) {
        throw new Error("User not found");
      }

      const alreadyRequested = user.requestedByMe.some(
        request => request.userId === targetUserId
      );
      const alreadyHasRequest = targetUser.requestsForMe.some(
        request => request.userId === userId
      );

      if (alreadyRequested || alreadyHasRequest) {
        return { message: "Friend request already sent" };
      }

      const requestedByMeObject = {
        userId: targetUserId,
        username: user.username,
        followedAt: new Date(),
      };
      const requestsForMeObject = {
        userId,
        username: targetUser.username,
        followedAt: new Date(),
      };
// correct code, dont change
      await User.updateOne(
        { _id: userId },
        { $addToSet: { requestedByMe: requestsForMeObject } },
        { new: true }
      );
      await User.updateOne(
        { _id: targetUserId },
        { $addToSet: { requestsForMe: requestedByMeObject } },
        { new: true }
      );

      return { message: "Friend request sent" };
    } catch (error) {
      console.error("Error in sendFriendRequest", error);
      throw new Error("Error in sendFriendRequest");
    }
  };

  const makeUserAFollower = async (userId: string, targetUserId: string) => {
    try {
      const user = await User.findById(userId);
      const targetUser = await User.findById(targetUserId);

      if (!user || !targetUser) {
        throw new Error("User not found");
      }

      const alreadyFollowing = user.following.some(
        follow => follow.userId.toString() === targetUserId
      );
      const alreadyFollowedBy = targetUser.followers.some(
        follower => follower.userId.toString() === userId
      );

      if (alreadyFollowing || alreadyFollowedBy) {
        return { message: "Already following this user" };
      }

      const followObject = {
        userId: targetUserId,
        username: targetUser.username,
        followedAt: new Date(),
      };
      const followerObject = {
        userId: userId,
        username: user.username,
        followedAt: new Date(),
      };

      await User.updateOne(
        { _id: userId },
        { $addToSet: { following: followObject } }
      );
      await User.updateOne(
        { _id: targetUserId },
        { $addToSet: { followers: followerObject } }
      );

      return { message: "You are now following this user" };
    } catch (error) {
      console.error("Error in makeUserAFollower", error);
      throw new Error("Error in makeUserAFollower");
    }
  };

  const unfollowUser = async (userId: string, targetUserId: string) => {
    try {
      const user = await User.findById(userId);
      const targetUser = await User.findById(targetUserId);

      if (!user || !targetUser) {
        throw new Error("User not found");
      }

      await User.updateOne(
        { _id: userId },
        { $pull: { following: { targetUserId } } }
      );
      await User.updateOne(
        { _id: targetUserId },
        { $pull: { followers: { userId } } }
      );

      console.log("Unfollow successful");
      return { message: "You have unfollowed this user" };
    } catch (error) {
      console.error("Error in unfollowUser", error);
      throw new Error("Error in unfollowing the user");
    }
  };

  const cancelSendFriendRequest = async (
    userId: string,
    targetUserId: string
  ) => {
    try {
      const user = await User.findById(userId);
      const targetUser = await User.findById(targetUserId);

      if (!user || !targetUser) {
        throw new Error("User not found");
      }

      await User.updateOne(
        { _id: userId },
        { $pull: { requestedByMe: { targetUserId } } }
      );
      await User.updateOne(
        { _id: targetUserId },
        { $pull: { requestsForMe: { userId } } }
      );

      console.log("Unfollow successful");
      return { message: "You have cancelled the friend request sent" };
    } catch (error) {
      console.error("Error in cancelSendFriendRequest", error);
      throw new Error("Error in cancelling the send friend request");
    }
  };

  const acceptFriendRequest = async (
    userId: string,
    targetUserId: string
  ) => {
    try {
      const user = await User.findById(userId);
      const targetUser = await User.findById(targetUserId);

      if (!user || !targetUser) {
        throw new Error("User not found");
      }

     // correct code

      console.log("Unfollow successful");
      return { message: "You have cancelled the friend request sent" };
    } catch (error) {
      console.error("Error in cancelSendFriendRequest", error);
      throw new Error("Error in cancelling the send friend request");
    }
  };

  const clearAll = async () => {
    try {
      const result = await User.updateMany(
        {},
        {
          $set: {
            requestsForMe: [],
            requestedByMe: [],
            followers: [],
            following: [],
          },
        }
      );

      console.log(`Cleared data for  users.`);
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  // clearAll();

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
    sendFriendRequest,
    makeUserAFollower,
    unfollowUser,
    cancelSendFriendRequest,
    acceptFriendRequest
  };
};
//////////////////////////////////////////////////////////

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
