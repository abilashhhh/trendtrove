import ErrorInApplication from "../../../utils/ErrorInApplication";
const otpGenerator = require("otp-generator");
import { UserDBInterface } from "../../repositories/userDBRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { UserInterface } from "../../../types/userInterface";
import { OtpDbInterface } from "../../repositories/OTPDBRepository";
import { mailSenderService } from "../../../frameworks/services/mailSendService";
import { MailSenderServiceInterface } from "../../services/mailServiceInterface";

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

  const existingPhoneNumber = await dbUserRepository.getUserByPhone(user.phone);
  if (existingPhoneNumber) {
    throw new ErrorInApplication("Phone number already exists!", 401);
  }

  user.password = await authService.encryptPassword(user.password);
  await dbUserRepository.addUser(user);
  console.log(user);
};



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
    })
    await dbOtpRepository.saveNewOtp({email, otp});
    if (text === "email-verification") {
      await mailSenderService.sendVerificationEmail(email, Number(otp))
    } else if (text === "forgot-password") {
      await mailSenderService.sendForgotPasswordEmail(email, Number(otp))
    }
  } catch (error) {
    console.log("Error in handleSendOtp: ", error)
    throw new ErrorInApplication("Error in handleSendOtp" , 401)
  }
};




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
