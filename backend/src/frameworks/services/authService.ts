import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import configurationKeys from "../../config";

export const authService = () => {

  const encryptPassword = async (password: string) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  };

  const comparePassword = (password: string, hashedPassword: string) => {
    return bcryptjs.compare(password, hashedPassword);
  };


  return {
    encryptPassword,
    comparePassword,
    
  };
};


export type AuthService = typeof authService;
export type AuthServiceReturn = ReturnType<AuthService>;