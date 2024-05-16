import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepository";
import { UserInterface, GoogleUserInterface } from "../../types/userInterface";

export const userDBRepository = (  repository: ReturnType<UserRepositoryMongoDB> ) => {

    const addUser = async (user : UserInterface | GoogleUserInterface) => await repository.addUser(user);

    const getUserByEmail = async (email : string) => await repository.getUserByEmail(email);

    const getUserByUsername = async (username: string) => await repository.getUserByUsername(username);

    return {
        addUser,
        getUserByEmail,
        getUserByUsername,
     };
};

export type UserDBInterface = typeof userDBRepository;
