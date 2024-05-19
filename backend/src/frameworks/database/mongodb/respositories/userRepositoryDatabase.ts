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
      console.log("Add user tried to run, data : ", user) 

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
      const user = await User.findById( userId );
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

  const logoutUser = async( userId : string  ) => {
    try {
      await User.updateOne({
        _id : userId},{ $unset : {refreshToken : 1 , refreshTokenExpiresAt : 1}
      })
    } catch (error) {
      throw new Error("Error logging out user")
    }
  }

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

  return {
    addUser,
    getUserByEmail,
    getUserById,
    getUserByUsername,
    addRefreshTokenAndExpiry,
    logoutUser
  };
};
//////////////////////////////////////////////////////////

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;

 