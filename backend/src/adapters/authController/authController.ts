import { Request, Response } from "express";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { UserDBInterface} from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB} from "../../frameworks/database/mongodb/respositories/userRepository";

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
        const user : UserInterface = req.body
        await userRegister(user, dbUserRepository, authService)
        res.json({
            status : "success",
            message : "User verified"
        })
    }

    return {
        registerUser
    }

}

export default authController;