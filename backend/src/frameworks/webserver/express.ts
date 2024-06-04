//     import cookieParser from "cookie-parser";
// import express ,{ Application, NextFunction} from "express"
// import cors from "cors";

// const corsOptions = {
//     origin: 'http://localhost:5173', //  frontend URL
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   };

//     const expressConfigurations = (app: Application) => {
//         app.use(express.json());
//         app.use(express.urlencoded({extended : true}))
//         app.use(cookieParser())
//         app.use(cors(corsOptions))
//     }

//     export default expressConfigurations

import express, { Application, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import configKeys from "../../config";

const expressConfig = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  const corsOptions = {
    origin: ["*", configKeys.CLIENT_URL],
  };

  app.use(cors({ credentials: true, ...corsOptions }));
};

export default expressConfig;
