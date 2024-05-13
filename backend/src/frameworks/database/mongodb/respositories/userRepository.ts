import {
  GoogleUserInterface,
  UserInterface,
} from "../../../../types/userInterface";

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
};


return {
  addUser,
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
