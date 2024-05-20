    import cookieParser from "cookie-parser";
import express ,{ Application, NextFunction} from "express"
import cors from "cors";


const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
    const expressConfigurations = (app: Application) => {
        app.use(express.json());
        app.use(express.urlencoded({extended : true}))
        app.use(cookieParser())
        app.use(cors(corsOptions))
    }


    export default expressConfigurations