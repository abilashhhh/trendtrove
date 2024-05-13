    import cookieParser from "cookie-parser";
import express ,{ Application, NextFunction} from "express"
import cors from "cors";

    const expressConfigurations = (app: Application) => {
        app.use(express.json());
        app.use(express.urlencoded({extended : true}))
        app.use(cookieParser())
        app.use(cors())
    }


    export default expressConfigurations