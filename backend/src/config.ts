import dotenv from "dotenv";
dotenv.config();

const configurationKeys = {
  PORT: process.env.PORT,
  MONGODB: process.env.MONGODB as string,
  JWT_ACCESS_CODE: process.env.JWT_ACCESS_CODE as string,
  JWT_REFRESH_CODE: process.env.JWT_REFRESH_CODE as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  MAIL_USERNAME: process.env.MAIL_USERNAME as string,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD as string,
 
};

export default configurationKeys;
