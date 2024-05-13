import express, { Application, Request, Response, NextFunction } from "express";
import connectToMongoDB from "./frameworks/database/mongodb/connection";
import expressConfigurations from "./frameworks/webserver/express";
import routes from "./frameworks/webserver/routes";
import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorHandlingMiddleware";
import serverConfigurations from "./frameworks/webserver/server";

const app: Application = express();

connectToMongoDB(); // MongoDB setup
expressConfigurations(app); // Express setup
routes(app); // Routes for each endpoint

app.use(errorHandlingMiddleware); // Middleware - error handling
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new Error("Request not found"));
});

serverConfigurations(app);
