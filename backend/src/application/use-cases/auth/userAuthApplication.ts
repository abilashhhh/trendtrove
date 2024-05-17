import ErrorInApplication from "../../../utils/ErrorInApplication";
const otpGenerator = require("otp-generator");
import { UserDBInterface } from "../../repositories/userDBRepository";
import { AuthServiceInterface } from "../../services/authenticationServiceInterface";
import { UserInterface } from "../../../types/userInterface";
import { OtpDbInterface } from "../../repositories/OTPDBRepository";
import { MailSenderServiceInterface } from "../../services/mailServiceInterface";
// import { mailSenderService } from "../../../frameworks/services/mailSendService";

////////////////////////////////////////////////////////////////////////////////

export const userRegister = async (
  user: UserInterface,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const existingEmail = await dbUserRepository.getUserByEmail(user.email);
  if (existingEmail) {
    throw new ErrorInApplication("Email already exists", 401);
  }

  const existingUsername = await dbUserRepository.getUserByUsername(
    user.username
  );

  if (existingUsername) {
    throw new ErrorInApplication("Username already exists!", 401);
  }

  user.password = await authService.encryptPassword(user.password);
  await dbUserRepository.addUser(user);
  console.log(user);
};

////////////////////////////////////////////////////////////////////////////////

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
    console.log("Error in handleSendOtp: ", error);
    throw new ErrorInApplication("Error in handleSendOtp", 401);
  }
};

////////////////////////////////////////////////////////////////////////////////

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
    console.log("Error in handleOtpVerification: ", error);
    throw new ErrorInApplication("Error in handleOtpVerification", 401);
  }
};

////////////////////////////////////////////////////////////////////////////////

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
    console.log("Error in handleResendOtp: ", error);
    throw new ErrorInApplication("Error in handleResendOtp", 401);
  }
};

////////////////////////////////////////////////////////////////////////////////

export const userLogin = async (
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
  const isPasswordCorrect = await authService.comparePassword(
    password,
    user?.password?.toString() || ""
  );
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
    city: user?.city,
    followers: user?.followers,
    following: user?.following,
    isVerifiedAccount: user?.isVerifiedAccount,
    isBlock: user?.isBlocked,
  };

  const refreshToken = authService.generateRefreshToken({userId : user._id.toString() , role : "client"})
  const accessToken = authService.generateAccessToken({userId : user._id.toString() , role : "client"})
  await dbUserRepository.addRefreshTokenAndExpiry(email, refreshToken)   // setting the expirry 7days

  return { userDetails, refreshToken , accessToken };
};



////////////////////////////////////////////////////////////////////////////////
export const accessTokenRefresh = async (
  cookies: { refreshToken: string },
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  if (!cookies?.refreshToken) {
    throw new ErrorInApplication("Invalid token",401);
  }
  const refreshToken = cookies.refreshToken;
  const { userId, role } = authService.verifyRefreshToken(refreshToken.toString());
  if (!userId || role !== "client") {
    throw new ErrorInApplication("Invalid token",401);
  }
  const user = await dbUserRepository.getUserById(userId);
  if (!user?.refreshToken || !user?.refreshTokenExpiresAt) {
    throw new ErrorInApplication("Invalid token!",401);
  }
  const expiresAt = user.refreshTokenExpiresAt.getTime();
  if (!expiresAt || Date.now() > expiresAt) {
    throw new ErrorInApplication("Invalid token!",401);
  }
  const newAccessToken = authService.generateAccessToken({ userId: userId, role: "client" });
  return newAccessToken;
};



///////////////////////////////////////////////////////////////////////////////

const tokenVerification = async(token : string ,
  authService : ReturnType<AuthServiceInterface>
) => {
  const decodedToken = authService.verifyAccessToken(token);
  if(!decodedToken){
    throw new ErrorInApplication("Invalid token!",401);
  }else{
    return decodedToken
  }
}



///////////////////////////////////////////////////////////////////////////////


export const handleLogoutUser = async(userId : string , dbUserRepository : ReturnType<UserDBInterface> ) => {
  await dbUserRepository.logoutUser(userId)
} 