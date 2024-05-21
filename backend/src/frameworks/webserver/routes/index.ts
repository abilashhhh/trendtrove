import { Application } from "express";
import authRouter from "./authRoutes";
import profileRouter from "./profileRoutes";
import userRouter from "./userRoutes";

const routes = (app: Application) => {
  app.use("/api/auth", authRouter());
  app.use("/api/profile", profileRouter());
  app.use("/api/user", userRouter());
};

export default routes;
