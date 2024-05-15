import { Request, Response } from "express";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { UserDBInterface} from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB} from "../../frameworks/database/mongodb/respositories/userRepository";
import ErrorInApplication from "../../utils/ErrorInApplication";

// Types 
import { UserInterface } from "../../types/userInterface";

// use cases
import { userRegister } from "../../application/use-cases/auth/userAuth";



const authController = (
    authServiceImplementation : AuthService,
    authServiceInterface : AuthServiceInterface,
    userDBRepositoryImplementation : UserRepositoryMongoDB,
    userDBRepositoryInterface: UserDBInterface

) => {
    const authService = authServiceInterface(authServiceImplementation())
    const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation())

  
    const registerUser = async(req : Request , res : Response) => {
        console.log(req.body)
        const user : UserInterface = req.body;
        try {
            await userRegister(user, dbUserRepository, authService);
            res.status(200).json({
                status : "success",
                message : "User registered successfully"
            });
        } catch (error) {
            console.error("Error registering user:", error);
            if (error instanceof ErrorInApplication) {  
                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message
                });
            } else {
                res.status(500).json({
                    status : "error",
                    message : "Failed to register the user"
                });
            }
        }
    }

    return {
        registerUser
    }

}

export default authController;
