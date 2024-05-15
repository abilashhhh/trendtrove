import express from 'express'
import authController from '../../../adapters/authController/authController';
import { authService } from '../../services/authService';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { userRepositoryMongoDB } from '../../database/mongodb/respositories/userRepository';
import { userDBRepository } from '../../../application/repositories/userDBRepository';
import authMiddleware from '../middlewares/authMiddleware'; // add auth middleware

import { otpRepositoryMongoDB } from '../../database/mongodb/respositories/otpRepositoryMongoDB';
import { otpDbRepository } from '../../../application/repositories/OTPDBRepository';
import { mailSenderService } from '../../services/mailSendService';
import { mailSenderServiceInterface } from '../../../application/services/mailServiceInterface';


const authRouter = () => {

    const router = express();

    const controller = authController (
        authService,
        authServiceInterface,
        userRepositoryMongoDB,
        userDBRepository,
        otpRepositoryMongoDB,
        otpDbRepository,
        mailSenderService,
        mailSenderServiceInterface,
    )

    router.post('/signup' , controller.registerUser)
    router.get('/usernameavailablity/:username' , controller.usernameAvailability)
    router.get('/emailavailability/:email' , controller.emailAvailability)
    router.post('/generateotp', controller.sendOtp); // generates otp and sent through mail
    router.post('/verifyotp', controller.verifyOtpForEmailVerification);
    return router
}

export default authRouter