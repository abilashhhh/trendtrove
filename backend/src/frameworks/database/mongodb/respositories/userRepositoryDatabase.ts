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
        "username dp name bio isPrivate"
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
        "username dp name email bio isPrivate isSuspended isBlocked isGoogleSignedIn"
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
  };
};
//////////////////////////////////////////////////////////

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
