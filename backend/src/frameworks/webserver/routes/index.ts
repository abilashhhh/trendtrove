import { Application } from "express";
import authRouter from "./auth";

const routes = (app: Application) => {
    
    // DUMMY DATA FOR TESTING
    app.get('/', (req, res) => {
        res.send("Hello World");
    });


    app.use('/api/auth' , authRouter())
};

export default routes;
