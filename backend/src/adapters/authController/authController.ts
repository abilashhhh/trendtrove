import { Request, Response } from "express";
import ErrorInApplication from "../../utils/ErrorInApplication";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepository";
import { OtpDbInterface } from "../../application/repositories/OTPDBRepository";
import { OtpRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/otpRepositoryMongoDB";
import { MailSenderService } from "../../frameworks/services/mailSendService";
import { MailSenderServiceInterface } from "../../application/services/mailServiceInterface";
import { UserInterface } from "../../types/userInterface";


import {  handleOtpVerification, handleSendOtp, userRegister, } from "../../application/use-cases/auth/userAuth";
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const authController = (
  authServiceImplementation: AuthService,
  authServiceInterface: AuthServiceInterface,
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  otpDBRepositoryImplementation: OtpRepositoryMongoDB,
  otpDbRepositoryInterface: OtpDbInterface,
  mailSenderServiceImplementation: MailSenderService,
  mailSenderServiceInterface: MailSenderServiceInterface
) => {
  const authService = authServiceInterface(authServiceImplementation());
  const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
  const dbOtpRepository = otpDbRepositoryInterface(otpDBRepositoryImplementation());
  const mailSenderService = mailSenderServiceInterface(mailSenderServiceImplementation());

  const registerUser = async (req: Request, res: Response) => {
    const user: UserInterface = req.body;
    try {
      await userRegister(user, dbUserRepository, authService);
      res.status(200).json({
        status: "success",
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      if (error instanceof ErrorInApplication) {
        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Failed to register the user",
        });
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const usernameAvailability = async (req: Request, res: Response) => {
    const { username } = req.params;
    console.log("username from controller:", username);
    try {
      const isAvailable = await dbUserRepository.getUserByUsername(username);
      console.log("isAvailable : ", isAvailable);
      if (isAvailable === null) {
        res.json({
          available: true,
          status: "Username is available",
        });
      } else {
        res.json({
          available: false,
          status: "Username not available",
        });
      }
    } catch (error) {
      console.error("Error checking username availability:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to check username availability",
      });
    }
  };

  const emailAvailability = async (req: Request, res: Response) => {
    const { email } = req.params;
    console.log("email from controller:", email);
    try {
      const isAvailable = await dbUserRepository.getUserByEmail(email);
      console.log("isAvailable : ", isAvailable);
      if (isAvailable === null) {
        res.json({
          available: true,
          status: "",
        });
      } else {
        res.json({
          available: false,
          status: "Email id already registered, Try logging in",
        });
      }
    } catch (error) {
      console.error("Error checking email availability:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to check email availability",
      });
    }
  };



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////




  const sendOtp = async (req: Request, res: Response) => {
    const { email, text }: { email: string; text: string } = req.body;
    await handleSendOtp(email, text, dbOtpRepository, mailSenderService);
    res.json({
      status: "success",
      message: "OTP sent",
    });
  };


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const verifyOtpForEmailVerification = async (req: Request, res: Response) => {
    const { email, otp }: { email: string; otp: string } = req.body;
    console.log("req.body in verifyotp: " , req.body)
    const isOtpValid = await handleOtpVerification(
      email,
      otp,
      dbOtpRepository,
    );
    console.log("isOtpValid: ", isOtpValid)
    if (isOtpValid) {
      return  res.json({
        status: "success",
        message: "OTP verified",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Invalid OTP",
      });
    }
  };
  



  return {
    registerUser,
    usernameAvailability,
    sendOtp,
    verifyOtpForEmailVerification,
    emailAvailability

  };
};

export default authController;
