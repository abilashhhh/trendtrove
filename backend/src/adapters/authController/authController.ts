// import { Request, Response } from "express";
// import ErrorInApplication from "../../utils/ErrorInApplication";
// import { AuthService } from "../../frameworks/services/authenticationService";
// import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
// import { UserDBInterface } from "../../application/repositories/userDBRepository";
// import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
// import { OtpDbInterface } from "../../application/repositories/OTPDBRepository";
// import { OtpRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/otpRepositoryDatabase";
// import { MailSenderService } from "../../frameworks/services/mailSendService";
// import { MailSenderServiceInterface } from "../../application/services/mailServiceInterface";
// import { UserInterface } from "../../types/userInterface";

// import {
//   accessTokenRefresh,
//   handleLogoutUser,
//   handleOtpVerification,
//   handleSendOtp,
//   userLogin,
//   userLoginUsingGoogle,
//   userRegister,
//   handleGoogleLoginOrSignup,
//   handleForgotPasswordChange,
//   login, // Import the new function
// } from "../../application/use-cases/auth/userAuthApplication"; 

// const authController = (
//   authServiceImplementation: AuthService,
//   authServiceInterface: AuthServiceInterface,
//   userDBRepositoryImplementation: UserRepositoryMongoDB,
//   userDBRepositoryInterface: UserDBInterface,
//   otpDBRepositoryImplementation: OtpRepositoryMongoDB,
//   otpDbRepositoryInterface: OtpDbInterface,
//   mailSenderServiceImplementation: MailSenderService,
//   mailSenderServiceInterface: MailSenderServiceInterface
// ) => {
//   const authService = authServiceInterface(authServiceImplementation());
//   const dbUserRepository = userDBRepositoryInterface(
//     userDBRepositoryImplementation()
//   );
//   const dbOtpRepository = otpDbRepositoryInterface(
//     otpDBRepositoryImplementation()
//   );
//   const mailSenderService = mailSenderServiceInterface(
//     mailSenderServiceImplementation()
//   );

//   const registerUser = async (req: Request, res: Response) => {
//     const user: UserInterface = req.body;
//     try {
//       await userRegister(user, dbUserRepository, authService);
//       res.status(200).json({
//         status: "success",
//         message: "User registered successfully",
//       });
//     } catch (error) {
//       console.error("Error registering user:", error);
//       if (error instanceof ErrorInApplication) {
//         res.status(error.statusCode).json({
//           status: error.status,
//           message: error.message,
//         });
//       } else {
//         res.status(500).json({
//           status: "error",
//           message: "Failed to register the user",
//         });
//       }
//     }
//   };

//   const usernameAvailability = async (req: Request, res: Response) => {
//     const { username } = req.params;
//     try {
//       const isAvailable = await dbUserRepository.getUserByUsername(username);
//       if (!isAvailable) {
//         res.json({
//           available: true,
//           status: "Username is available",
//         });
//       } else {
//         res.json({
//           available: false,
//           status: "Username not available",
//         });
//       }
//     } catch (error) {
//       console.error("Error checking username availability:", error);
//       res.status(500).json({
//         status: "error",
//         message: "Failed to check username availability",
//       });
//     }
//   };

//   const emailAvailability = async (req: Request, res: Response) => {
//     const { email } = req.params;
//     try {
//       const isAvailable = await dbUserRepository.getUserByEmail(email);
//       if (!isAvailable) {
//         res.json({
//           available: true,
//           status: "",
//         });
//       } else {
//         res.json({
//           available: false,
//           status: "Email id already registered, Try logging in",
//         });
//       }
//     } catch (error) {
//       console.error("Error checking email availability:", error);
//       res.status(500).json({
//         status: "error",
//         message: "Failed to check email availability",
//       });
//     }
//   };

//   const forgotPassword =async(req :Request, res :Response ) => {
//     const {email , text} = req.body
//     try {
//       const isAvailable = await dbUserRepository.getUserByEmail(email);
//       if(isAvailable){
//         await handleSendOtp(email, text, dbOtpRepository, mailSenderService);
//         res.json({
//           status : "success",
//           message : "OTP sent to the given mail id",
//         });
//       }else{
//         res.json({
//           status : "error",
//           message : "Email id not registered, Try signing up",
//         });
//       }
//     } catch (error) {
      
//     }
//   }

//   const forgotpasswordchange =async(req :Request, res :Response ) => {
//     const {email , password} = req.body
//     try {
//       const isAvailable = await dbUserRepository.getUserByEmail(email);
//       if(isAvailable){
//         let userId = isAvailable._id.toString()
//         await handleForgotPasswordChange(userId, password, authService, dbUserRepository);
//         res.json({
//           status : "success",
//           message : "OTP sent to the given mail id",
//         });
//       }else{
//         res.json({
//           status : "error",
//           message : "Email id not registered, Try signing up",
//         });
//       }
//     } catch (error) {
      
//     }
//   }

//   const sendOtp = async (req: Request, res: Response) => {
//     const { email, text }: { email: string; text: string } = req.body;
//     await handleSendOtp(email, text, dbOtpRepository, mailSenderService);
//     res.json({
//       status: "success",
//       message: "OTP sent",
//     });
//   };

//   const verifyOtpForEmailVerification = async (req: Request, res: Response) => {
//     const { email, otp }: { email: string; otp: string } = req.body;
//     const isOtpValid = await handleOtpVerification(email, otp, dbOtpRepository);
//     if (isOtpValid) {
//       return res.json({
//         status: "success",
//         message: "OTP verified",
//       });
//     } else {
//       return res.status(400).json({
//         status: "failed",
//         message: "Invalid OTP",
//       });
//     }
//   };

//   // const signInUser = async (req: Request, res: Response) => {
//   //   const { email, password }: { email: string; password: string } = req.body;
//   //   try {
//   //     const { userDetails, refreshToken, accessToken } = await userLogin(
//   //       email,
//   //       password,
//   //       dbUserRepository,
//   //       authService
//   //     );

//   //     res.cookie('refreshToken', refreshToken, {
//   //       httpOnly: true,
//   //       secure: true,
//   //       sameSite: 'none',
//   //       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//   //     });

//   //     res.json({
//   //       status: "success",
//   //       message: "user verified",
//   //       user: userDetails,
//   //       accessToken
//   //     });
//   //   } catch (error) {
//   //     res.status(404).json({
//   //       status: "error",
//   //       message: "User not found",
//   //     });
//   //   }
//   // };

//   const signIn = async (req: Request, res: Response) => {
//     const { email, password }: { email: string; password: string } = req.body;
//     try {
//       const { userDetails, refreshToken, accessToken } = await login(
//         email,
//         password,
//         dbUserRepository,
//         authService
//       );
  
//       res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'none',
//         maxAge: 7 * 24 * 60 * 60 * 1000  
//       });
  
//       res.json({
//         status: "success",
//         message: "user verified",
//         user: userDetails,
//         accessToken
//       });
//     } catch (error: any) {
//       res.status(404).json({
//         status: "error",
//         message: error.message,
//       });
//     }
//   };
  
//   const loginOrSignUpUsingGoogle = async (req: Request, res: Response) => {
//     const user = req.body;
//     try {
//       const { userDetails, refreshToken, accessToken } = await handleGoogleLoginOrSignup(user, dbUserRepository, authService);
  
//       console.log("UserDetails in loginOrSignUpUsingGoogle from adapterd: ", userDetails, refreshToken , accessToken);
//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: true, 
//         sameSite: "none",
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       });
  
//       // Remove the password from userDetails
//       const { password, ...userDetailsWithoutPassword } = userDetails._doc;
  
//       console.log("Returning user details: ", userDetailsWithoutPassword);
  
//       res.json({
//         status: "success",
//         message: "User verified",
//         user: userDetailsWithoutPassword,
//         accessToken,
//       });
//     } catch (error) {
//       console.error("Error logging in or signing up with Google:", error);
//       res.status(500).json({
//         status: "error",
//         message: "Failed to log in or sign up using Google",
//       });
//     }
//   };
  

//   const refreshAccessToken = async (req: Request, res: Response) => {
//     try {
//       const cookies = req.cookies;
//       const accessToken = await accessTokenRefresh(
//         cookies, dbUserRepository, authService
//       );
      
//       res.json({ accessToken });
//     } catch (error) {
//       res.status(404).json({
//         status: "error",
//         message: "Failed to refresh access token",
//       });
//     }
//   };

//   const logoutUser = async (req: Request, res: Response) => {
//     try {
//       const { userId }: { userId: string } = req.body;
//       const cookies = req.cookies;
//       if (!cookies?.refreshToken) {
//         res.sendStatus(204);
//       }
//       await handleLogoutUser(userId, dbUserRepository);
//       res.clearCookie("refreshToken", {
//         httpOnly: true,
//         sameSite: "none",
//       });
//       res.json({
//         status: "success",
//         message: "Cookie Cleared"
//       });
//     } catch (error) {
//       res.json({
//         status: "fail",
//         message: "Cookie Not Cleared"
//       });
//     }
//   };

//   return {
//     registerUser,
//     usernameAvailability,
//     sendOtp,
//     verifyOtpForEmailVerification,
//     emailAvailability,
//     // signInUser,
//     signIn,
//     refreshAccessToken,
//     logoutUser,
//     loginOrSignUpUsingGoogle,
//     forgotPassword,
//     forgotpasswordchange
//   };
// };

// export default authController;


import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ErrorInApplication from "../../utils/ErrorInApplication";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { OtpDbInterface } from "../../application/repositories/OTPDBRepository";
import { OtpRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/otpRepositoryDatabase";
import { MailSenderService } from "../../frameworks/services/mailSendService";
import { MailSenderServiceInterface } from "../../application/services/mailServiceInterface";
import { UserInterface } from "../../types/userInterface";

import {
  accessTokenRefresh,
  handleLogoutUser,
  handleOtpVerification,
  handleSendOtp,
  userRegister,
  handleGoogleLoginOrSignup,
  handleForgotPasswordChange,
  login,
} from "../../application/use-cases/auth/userAuthApplication"; 

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
  const dbUserRepository = userDBRepositoryInterface(
    userDBRepositoryImplementation()
  );
  const dbOtpRepository = otpDbRepositoryInterface(
    otpDBRepositoryImplementation()
  );
  const mailSenderService = mailSenderServiceInterface(
    mailSenderServiceImplementation()
  );

  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user: UserInterface = req.body;
    await userRegister(user, dbUserRepository, authService);
    res.status(200).json({
      status: "success",
      message: "User registered successfully",
    });
  });

  const usernameAvailability = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const isAvailable = await dbUserRepository.getUserByUsername(username);
    if (!isAvailable) {
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
  });

  const emailAvailability = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;
    const isUsed = await dbUserRepository.getUserByEmail(email);
    if (!isUsed) {
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
  });

  const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email, text } = req.body;
    const isUsed = await dbUserRepository.getUserByEmail(email);
    if (isUsed) {
      await handleSendOtp(email, text, dbOtpRepository, mailSenderService);
      res.json({
        status: "success",
        message: "OTP sent to the given mail id",
      });
    } else {
      res.json({
        status: "error",
        message: "Email id not registered, Try signing up",
      });
    }
  });

  const forgotpasswordchange = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const isAvailable = await dbUserRepository.getUserByEmail(email);
    if (isAvailable) {
      let userId = isAvailable._id.toString();
      await handleForgotPasswordChange(userId, password, authService, dbUserRepository);
      res.json({
        status: "success",
        message: "Password changed successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "Email id not registered, Try signing up",
      });
    }
  });

  const sendOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email, text }: { email: string; text: string } = req.body;
    await handleSendOtp(email, text, dbOtpRepository, mailSenderService);
    res.json({
      status: "success",
      message: "OTP sent",
    });
  });

  const verifyOtpForEmailVerification = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp }: { email: string; otp: string } = req.body;
    const isOtpValid = await handleOtpVerification(email, otp, dbOtpRepository);
    if (isOtpValid) {
      res.json({
        status: "success",
        message: "OTP verified",
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Invalid OTP",
      });
    }
  });

  const signIn = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const { userDetails, refreshToken, accessToken } = await login(
      email,
      password,
      dbUserRepository,
      authService
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      status: "success",
      message: "user verified",
      user: userDetails,
      accessToken
    });
  });

  const loginOrSignUpUsingGoogle = asyncHandler(async (req: Request, res: Response) => {
    const user = req.body;
    const { userDetails, refreshToken, accessToken } = await handleGoogleLoginOrSignup(user, dbUserRepository, authService);

    console.log("UserDetails in loginOrSignUpUsingGoogle from adapterd: ", userDetails, refreshToken , accessToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password, ...userDetailsWithoutPassword } = userDetails._doc;

    console.log("Returning user details: ", userDetailsWithoutPassword);

    res.json({
      status: "success",
      message: "User verified",
      user: userDetailsWithoutPassword,
      accessToken,
    });
  });

  interface CookiesWithRefreshToken {
    refreshToken: string;
  }
  

  const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies as CookiesWithRefreshToken;
    const accessToken = await accessTokenRefresh(
      cookies, dbUserRepository, authService
    );

    res.json({ accessToken });
  });

  const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      res.sendStatus(204);
      return;
    }
    await handleLogoutUser(userId, dbUserRepository);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
    });
    res.json({
      status: "success",
      message: "Cookie Cleared"
    });
  });

  return {
    registerUser,
    usernameAvailability,
    sendOtp,
    verifyOtpForEmailVerification,
    emailAvailability,
    signIn,
    refreshAccessToken,
    logoutUser,
    loginOrSignUpUsingGoogle,
    forgotPassword,
    forgotpasswordchange
  };
};

export default authController;
