import dotenv from "dotenv";
dotenv.config();

const configurationKeys = {
  PORT: process.env.PORT,
  MONGODB: process.env.MONGODB as string,
};

export default configurationKeys;
