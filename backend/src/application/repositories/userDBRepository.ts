import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { ProfileInterface } from "../../types/profileInterface";
import { UserInterface, GoogleUserInterface } from "../../types/userInterface";

export const userDBRepository = (
  repository: ReturnType<UserRepositoryMongoDB>
) => {
  const addUser = async (user: UserInterface | GoogleUserInterface) =>
    await repository.addUser(user);

  const getUserByEmail = async (email: string) =>
    await repository.getUserByEmail(email);

  const getUserById = async (userId: string) =>
    await repository.getUserById(userId);

  const getUserByUsername = async (username: string) =>
    await repository.getUserByUsername(username);

  const logoutUser = async (userId: string) =>
    await repository.logoutUser(userId);

  const addRefreshTokenAndExpiry = async (
    email: string,
    refreshToken: string
  ) => {
    await repository.addRefreshTokenAndExpiry(email, refreshToken);
  };

  
  const changeIsAccountVerified = async(email: string) => await repository.changeIsAccountVerified(email)

  const changeIsAccountUnverified = async(userId: string) => await repository.changeIsAccountUnverified(userId)

  const updateProfile = async (profileInfo: ProfileInterface) =>
    await repository.updateProfile(profileInfo);

  

  return {
    addUser,
    getUserByEmail,
    getUserByUsername,
    addRefreshTokenAndExpiry,
    getUserById,
    logoutUser,
    updateProfile,
    changeIsAccountVerified,
    changeIsAccountUnverified
  };
};

export type UserDBInterface = typeof userDBRepository;
