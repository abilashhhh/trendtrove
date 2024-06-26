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

  const blockAccount = async (userId: string) =>
    await repository.blockAccount(userId);

  const unblockAccount = async (userId: string) =>
    await repository.unblockAccount(userId);

  const privateAccount = async (userId: string) =>
    await repository.privateAccount(userId);

  const getAllUsers = async (userId: string) =>
    await repository.getAllUsers(userId);

  const getAllUsersForAdmin = async () =>
    await repository.getAllUsersForAdmin();

  const sendFriendRequest = async (userId : string , targetUserId: string ) =>
    await repository.sendFriendRequest(userId , targetUserId );

  const makeUserAFollower = async (userId : string , targetUserId: string ) =>
    await repository.makeUserAFollower(userId , targetUserId );

  const unfollowUser = async (userId : string , targetUserId: string ) =>
    await repository.unfollowUser(userId , targetUserId );

  const cancelSendFriendRequest = async (userId : string , targetUserId: string ) =>
    await repository.cancelSendFriendRequest(userId , targetUserId );

  const acceptFriendRequestSend = async (userId : string , targetUserId: string ) =>
    await repository.acceptFriendRequestSend(userId , targetUserId );

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
    getAllUsers,
    getAllUsersForAdmin,
    blockAccount,
    unblockAccount,
    sendFriendRequest,
    makeUserAFollower,
    unfollowUser,
    cancelSendFriendRequest,
    acceptFriendRequestSend


  };
};

export type UserDBInterface = typeof userDBRepository;
