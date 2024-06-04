import { Application } from "express";
import authRouter from "./authRoutes";
import profileRouter from "./profileRoutes";
import userRouter from "./userRoutes";
import adminRouter from "./adminRoutes";
import postRouter from "./postRoutes";

const routes = (app: Application) => {
  app.use("/api/auth", authRouter());
  app.use("/api/profile", profileRouter());
  app.use("/api/user", userRouter());
  app.use("/api/post", postRouter());
  app.use("/api/admin", adminRouter());
};

export default routes;
