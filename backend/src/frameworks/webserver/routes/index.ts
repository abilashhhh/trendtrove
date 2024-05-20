import { Application } from "express";
import authRouter from "./authRoutes";
import profileRouter from "./profileRoutes";

const routes = (app: Application) => {
  app.use("/api/auth", authRouter());
  app.use("/api/profile", profileRouter());
};

export default routes;
