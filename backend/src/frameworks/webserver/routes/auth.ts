import express from 'express'
import authController from '../../../adapters/authController/authController';
import { authService } from '../../services/authService';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { userRepositoryMongoDB } from '../../database/mongodb/respositories/userRepository';
import { userDBRepository } from '../../../application/repositories/userDBRepository';
import authMiddleware from '../middlewares/authMiddleware'; // add auth middleware

const authRouter = () => {

    const router = express();

    const controller = authController (
        authService,
        authServiceInterface,
        userRepositoryMongoDB,
        userDBRepository,
    )

    router.post('/signup' , controller.registerUser)
    router.get('/usernameavailablity/:username' , controller.usernameAvailability)

    
    return router
}

export default authRouter