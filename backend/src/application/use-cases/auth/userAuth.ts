import ErrorInApplication from "../../../utils/ErrorInApplication";
import { UserDBInterface } from "../../repositories/userDBRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";

import { UserInterface } from "../../../types/userInterface";

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

  const existingPhoneNumber = await dbUserRepository.getUserByPhone(
    user.phone
  );
  if (existingPhoneNumber) {
    throw new ErrorInApplication("Phone number already exists!", 401);
  }

  user.password = await authService.encryptPassword(user.password);
  await dbUserRepository.addUser(user);
  console.log(user)
};
