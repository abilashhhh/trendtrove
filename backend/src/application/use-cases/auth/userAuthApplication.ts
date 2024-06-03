


import ErrorInApplication from "../../../utils/ErrorInApplication";
const otpGenerator = require("otp-generator");
import { UserDBInterface } from "../../repositories/userDBRepository";
import { AuthServiceInterface } from "../../services/authenticationServiceInterface";
import { GoogleUserInterface, UserInterface } from "../../../types/userInterface";
import { OtpDbInterface } from "../../repositories/OTPDBRepository";
import { MailSenderServiceInterface } from "../../services/mailServiceInterface";

// User Registration
export const userRegister = async (
  user: UserInterface,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const existingEmail = await dbUserRepository.getUserByEmail(user.email);
  if (existingEmail) {
    throw new ErrorInApplication("Email already exists", 401);
  }

  const existingUsername = await dbUserRepository.getUserByUsername(user.username);
  if (existingUsername) {
    throw new ErrorInApplication("Username already exists!", 401);
  }

  user.password = await authService.encryptPassword(user.password);
  await dbUserRepository.addUser(user);
  console.log(user);
};

// Handle OTP Sending
export const handleSendOtp = async (
  email: string,
  text: string,
  dbOtpRepository: ReturnType<OtpDbInterface>,
  mailSenderService: ReturnType<MailSenderServiceInterface>
) => {
  try {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await dbOtpRepository.saveNewOtp({ email, otp });
    if (text === "email-verification") {
      await mailSenderService.sendVerificationEmail(email, Number(otp));
    } else if (text === "forgot-password") {
      await mailSenderService.sendForgotPasswordEmail(email, Number(otp));
    }
  } catch (error) {
    console.error("Error in handleSendOtp: ", error);
    throw new ErrorInApplication("Error in handleSendOtp", 401);
  }
};


export const handleForgotPasswordChange = async (
  userId: string,
  newPassword: string,
  authService: ReturnType<AuthServiceInterface>,
  dbUserRepository: ReturnType<UserDBInterface>,

) => {
  try {

    const encryptedNewPassword = await authService.encryptPassword(newPassword);

    // Update user's password in the database
    const user = await dbUserRepository.updatePassword(
      userId,
      encryptedNewPassword
    );

    return user;
  } catch (err) {
    console.error("Error: ", err);
    throw new ErrorInApplication("Failed to change password", 401);
  }
};


// Handle OTP Verification
export const handleOtpVerification = async (
  email: string,
  otp: string,
  dbOtpRepository: ReturnType<OtpDbInterface>
) => {
  try {
    const latestOtp = await dbOtpRepository.getLatestOtp(email);
    if (!latestOtp || latestOtp.otp !== otp) {
      return false;
    }
    return true; // OTP verification successful
  } catch (error) {
    console.error("Error in handleOtpVerification: ", error);
    throw new ErrorInApplication("Error in handleOtpVerification", 401);
  }
};

// Handle Resending OTP
export const handleResendOtp = async (
  email: string,
  text: string,
  dbOtpRepository: ReturnType<OtpDbInterface>,
  mailSenderService: ReturnType<MailSenderServiceInterface>
) => {
  try {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await dbOtpRepository.saveNewOtp({ email, otp });
    if (text === "email-verification") {
      await mailSenderService.sendVerificationEmail(email, Number(otp));
    } else if (text === "forgot-password") {
      await mailSenderService.sendForgotPasswordEmail(email, Number(otp));
    }
  } catch (error) {
    console.error("Error in handleResendOtp: ", error);
    throw new ErrorInApplication("Error in handleResendOtp", 401);
  }
}; 


export const login = async (
  email: string,
  password: string,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user = await dbUserRepository.getUserByEmail(email);
  if (!user) {
    throw new ErrorInApplication("Invalid email or password!", 401);
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
    address: user?.address,
    password: user?.password,
    dp: user?.dp,
    coverPhoto: user?.coverPhoto,
    bio: user?.bio,
    gender: user?.gender,
    isBlocked: user?.isBlocked,
    isPrivate: user?.isPrivate,
    isVerifiedAccount: user?.isVerifiedAccount,
    isGoogleSignedIn: user?.isGoogleSignedIn,
    isPremium: user?.isPremium,
    isAdmin: user?.isAdmin,
    isSuspended: user?.isSuspended,
    posts: user?.posts,
    requestsForMe: user?.requestsForMe,
    requestedByMe: user?.requestedByMe,
    followers: user?.followers,
    following: user?.following,
    savedPosts: user?.savedPosts,
    notifications: user?.notifications,
    blockedUsers: user?.blockedUsers,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };
  

  const role = user.isAdmin ? "admin" : "user";
  const refreshToken = authService.generateRefreshToken({ userId: user._id.toString(), role });
  const accessToken = authService.generateAccessToken({ userId: user._id.toString(), role });
  await dbUserRepository.addRefreshTokenAndExpiry(email, refreshToken); 

  return { userDetails, refreshToken, accessToken };
};


// Access Token Refresh
export const accessTokenRefresh = async (
  cookies: { refreshToken: string },
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  if (!cookies?.refreshToken) {
    throw new ErrorInApplication("Invalid token", 401);
  }

  const refreshToken = cookies.refreshToken;
  const { userId, role } = authService.verifyRefreshToken(refreshToken.toString());
  if (!userId || role !== "client") {
    throw new ErrorInApplication("Invalid token", 401);
  }

  const user = await dbUserRepository.getUserById(userId);
  if (!user?.refreshToken || !user?.refreshTokenExpiresAt) {
    throw new ErrorInApplication("Invalid token!", 401);
  }

  const expiresAt = user.refreshTokenExpiresAt.getTime();
  if (!expiresAt || Date.now() > expiresAt) {
    throw new ErrorInApplication("Invalid token!", 401);
  }

  const newAccessToken = authService.generateAccessToken({ userId, role: "client" });
  return newAccessToken;
};

// Token Verification
export const tokenVerification = async (
  token: string,
  authService: ReturnType<AuthServiceInterface>
) => {
  const decodedToken = authService.verifyAccessToken(token);
  if (!decodedToken) {
    throw new ErrorInApplication("Invalid token!", 401);
  }
  return decodedToken;
};

// Handle User Logout
export const handleLogoutUser = async (
  userId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  await dbUserRepository.logoutUser(userId);
};

export const handleGoogleLoginOrSignup = async (
  user: { name: string; email: string; dp: string },
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  let userDetails;
  let refreshToken;
  let accessToken;

  const existingUser = await dbUserRepository.getUserByEmail(user.email);
  if (existingUser) {
    const result = await userLoginUsingGoogle(user, dbUserRepository, authService);
    userDetails = { ...result.userDetails, password: undefined };  
    refreshToken = result.refreshToken;
    accessToken = result.accessToken;

    // console.log("Existing user in app usecases: userDetails:", userDetails);
    // console.log("Existing user in app usecases: refreshToken:", refreshToken);
    // console.log("Existing user in app usecases: accessToken:", accessToken);

  } else {
    const result = await userRegisterUsingGoogle(user, dbUserRepository, authService);
    userDetails = { ...result.userDetails, password: undefined }; 
    refreshToken = result.refreshToken;
    // accessToken = result.accessToken;

    // console.log("New user in app usecases: userDetails:", userDetails);
    // console.log("New user in app usecases: refreshToken:", refreshToken);
    // console.log("New user in app usecases: accessToken:", accessToken);
  }

  return {
    userDetails,
    refreshToken,
    accessToken,
  };
};


// User Registration Using Google
export const userRegisterUsingGoogle = async (
  user: { name: string; email: string; dp: string },
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  try {
    console.log("Separate code running, userRegisterUsingGoogle user details:", user);

    const username = user.name.toLocaleLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 100);
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const newPassword = await authService.encryptPassword(generatedPassword);
    console.log("Generated password:", newPassword);

    const userData: GoogleUserInterface = {
      name: user.name,
      email: user.email,
      username,
      password: newPassword,
      dp: user.dp,
      isGoogleSignedIn: true,
    };

    const savedUser = await dbUserRepository.addUser(userData);
    console.log("Registered user:", savedUser);

    const refreshToken = authService.generateRefreshToken({ userId: savedUser._id.toString(), role: "client" });
    const accessToken = authService.generateAccessToken({ userId: savedUser._id.toString(), role: "client" });

    return {
      userDetails: savedUser,
      refreshToken,
      accessToken,
    };
  } catch (error) {
    throw new ErrorInApplication("Failed to register user with Google", 500);
  }
};

// User Login Using Google
export const userLoginUsingGoogle = async (
  user: { name: string; email: string; dp: string },
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  try {
    console.log("Separate code running, userLoginUsingGoogle user details:", user);

    const existingUser: any = await dbUserRepository.getUserByEmail(user.email);
    if (!existingUser) {
      throw new ErrorInApplication("User not found", 404);
    }

    if (existingUser.isAdmin) {
      throw new ErrorInApplication("Admins cant login here", 404);
    }
    
    if (existingUser.isBlocked) {
      throw new ErrorInApplication("Cant login, Admin blocked you!", 404);
    }

    const refreshToken = authService.generateRefreshToken({ userId: existingUser._id.toString(), role: "client" });
    const accessToken = authService.generateAccessToken({ userId: existingUser._id.toString(), role: "client" });

    return {
      userDetails: existingUser,
      refreshToken,
      accessToken,
    };
  } catch (error) {
    throw new ErrorInApplication("Failed to log in user with Google", 500);
  }
};
