import ErrorInApplication from "../../../utils/ErrorInApplication";
import { UserDBInterface } from "../../repositories/userDBRepository";
import { AuthServiceInterface } from "../../services/authenticationServiceInterface";
 
// User Login
export const handleAdminSignin = async (
  email: string,
  password: string,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user = await dbUserRepository.getUserByEmail(email);
  if (!user) {
    throw new ErrorInApplication("Invalid email or password!", 401);
  }
  if (!user.isAdmin) {
    throw new ErrorInApplication("This is admins login. Users cant login here!", 401);
  }
  if (user.isBlocked) {
    throw new ErrorInApplication("Your account has been blocked!", 401);
  }

  const isPasswordCorrect = await authService.comparePassword(password, user?.password?.toString() || "");
  if (!isPasswordCorrect) {
    throw new ErrorInApplication("Invalid email or password!", 401);
  }

  const userDetails = {
    _id: user?._id.toString(),
    name: user?.name,
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    coverPhoto: user?.coverPhoto,
    dp: user?.dp,
    bio: user?.bio,
    gender: user?.gender,
    address: user?.address,
    followers: user?.followers,
    following: user?.following,
    isVerifiedAccount: user?.isVerifiedAccount,
    isGoogleSignedIn: user?.isGoogleSignedIn,
    isBlocked: user?.isBlocked,
    isAdmin: user?.isAdmin,
  };

  const refreshToken = authService.generateRefreshToken({ userId: user._id.toString(), role: "admin" });
  const accessToken = authService.generateAccessToken({ userId: user._id.toString(), role: "admin" });
  await dbUserRepository.addRefreshTokenAndExpiry(email, refreshToken); // setting the expiry to 7 days

  return { userDetails, refreshToken, accessToken };
};
 

// Handle User Logout
export const handleLogoutUser = async (
  userId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  await dbUserRepository.logoutUser(userId);
};
 