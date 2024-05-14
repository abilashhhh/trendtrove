import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepository";

import { UserInterface, GoogleUserInterface } from "../../types/userInterface";

export const userDBRepository = (  repository: ReturnType<UserRepositoryMongoDB> ) => {

    const addUser = async (user : UserInterface | GoogleUserInterface) => await repository.addUser(user);

    const getUserByEmail = async (email : string) => await repository.getUserByEmail(email);

    const getUserByUsername = async (username: string) => await repository.getUserByUsername(username);

    const getUserByPhone = async (phone : number) => await repository.getUserByPhone(phone);

    return {
        addUser,
        getUserByEmail,
        getUserByUsername,
        getUserByPhone,
     };
};

export type UserDBInterface = typeof userDBRepository;
