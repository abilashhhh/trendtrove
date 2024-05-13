import express from 'express'
import authController from '../../../adapters/authController/authController';
import { authService } from '../../services/authService';
import { authServiceInterface } from '../../../application/services/authServiceInterface';

const authRouter = () => {

    const router = express();

    const controller = authController (
        authService,
        authServiceInterface,
    )

    router.post('/signup' , controller.registerUser)

    return router
}

export default authRouter