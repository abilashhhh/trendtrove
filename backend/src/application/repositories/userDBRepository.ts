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

  const changeIsAccountVerified = async (email: string) =>
    await repository.changeIsAccountVerified(email);

  const changeIsAccountUnverified = async (userId: string) =>
    await repository.changeIsAccountUnverified(userId);

  const updateProfile = async (profileInfo: ProfileInterface) =>
    await repository.updateProfile(profileInfo);

  const updatePassword = async (_id: string, encryptedNewPassword: string) =>
    await repository.updatePassword(_id, encryptedNewPassword);

  const deleteAccount = async (userId: string) =>
    await repository.deleteAccount(userId);

  const suspendAccount = async (userId: string) =>
    await repository.suspendAccount(userId);

  const privateAccount = async (userId: string) =>
    await repository.privateAccount(userId);

  return {
    addUser,
    getUserByEmail,
    getUserByUsername,
    addRefreshTokenAndExpiry,
    getUserById,
    logoutUser,
    updateProfile,
    updatePassword,
    deleteAccount,
    suspendAccount,
    privateAccount,
    changeIsAccountVerified,
    changeIsAccountUnverified,
  };
};

export type UserDBInterface = typeof userDBRepository;
