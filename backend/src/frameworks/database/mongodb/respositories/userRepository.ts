  import {
    GoogleUserInterface,
    UserInterface,
  } from "../../../../types/userInterface";

  import User from "../models/userModel";

  export const userRepositoryMongoDB = () => {
    
    const addUser = async (user: UserInterface | GoogleUserInterface) => {
      try {
        const newUser = new User(user);
        return await newUser.save();
      } catch (error) {
        console.log(error);
        throw new Error("Error adding user!");
      }
    };

    const getUserByEmail = async( email : string) => {
      try {
        const user = await User.findOne({email})
        return user
      } catch (error) {
        console.log(error);
        throw new Error("Error getting user by email!");
      }
    }

    const getUserByUsername = async( username : string) => {
      try {
        console.log('repo ;',username)
        const user = await User.findOne({username})
        return user
      } catch (error) {
        console.log(error);
        throw new Error("Error getting user by username!");
      }
    }
 


    return {
      addUser,
      getUserByEmail,
      getUserByUsername,


    };


  };




  export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;

