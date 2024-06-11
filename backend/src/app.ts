import express, { Application, Request, Response, NextFunction } from "express";
import connectToMongoDB from "./frameworks/database/mongodb/connection";
import expressConfigurations from "./frameworks/webserver/express";
import routes from "./frameworks/webserver/routes";
import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorHandlingMiddleware";
import serverConfigurations from "./frameworks/webserver/server";
import ErrorInApplication from "./utils/ErrorInApplication";

const app: Application = express();

connectToMongoDB();
expressConfigurations(app);
routes(app);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorInApplication("Request not found", 404));
  });
app.use(errorHandlingMiddleware);

serverConfigurations(app);
