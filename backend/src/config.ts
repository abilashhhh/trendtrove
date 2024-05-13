import dotenv from "dotenv";
dotenv.config();

const configurationKeys = {
  PORT: process.env.PORT,
  MONGODB: process.env.MONGODB as string,
  JWT_ACCESS_CODE: process.env.JWT_ACCESS_CODE as string,
  JWT_REFRESH_CODE: process.env.JWT_REFRESH_CODE as string,
};

export default configurationKeys;
