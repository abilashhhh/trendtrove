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

  const generateAccessToken = (payload: { userId: string; role: string }) => {
    const accessToken = jwt.sign(payload, configurationKeys.JWT_ACCESS_CODE, {
      expiresIn: "15m",
    });
    return accessToken;
  };

  const generateRefreshToken = (payload: { userId: string; role: string }) => {
    const refreshToken = jwt.sign(payload, configurationKeys.JWT_REFRESH_CODE, {
      expiresIn: "15m",
    });
    return refreshToken;
  };

  const verifyAccessToken = (token: string) => {
    try {
      const payload = jwt.verify(token, configurationKeys.JWT_ACCESS_CODE) as {
        userId: string;
        role: string;
      };
      return payload;
    } catch (error) {
      throw new Error("Invalid access token");
    }
  };
  
  const verifyRefreshToken = (token: string) => {
    try {
      const payload = jwt.verify(token, configurationKeys.JWT_REFRESH_CODE) as {
        userId: string;
        role: string;
      };
      return payload;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  };

  return {
    encryptPassword,
    comparePassword,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
  };
};


export type AuthService = typeof authService;
export type AuthServiceReturn = ReturnType<AuthService>;