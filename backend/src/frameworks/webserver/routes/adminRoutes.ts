import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import adminController from "../../../adapters/adminController/adminController";
import { postDBRepository } from "../../../application/repositories/postDBRepository";
import { postRepositoryMongoDB } from "../../database/mongodb/respositories/postRepositoryDatabase";

const adminRouter = () => {
  const router = express();

  const controller = adminController(
    userRepositoryMongoDB,
    userDBRepository,
    postRepositoryMongoDB,
    postDBRepository,
    authService,
    authServiceInterface
  );

  // router.post("/signin" , controller.signin);
  router.post("/logout", controller.logout);
  router.get("/getusersforadmin", controller.getAllUsersForAdmin);
  router.get("/getallpostreportsandposts", controller.getallpostreports);
  router.patch("/blockuser/:id" ,controller.blockAccount);
  router.patch("/unblockuser/:id" ,controller.unblockAccount);
  router.patch("/blockpost/:postId" ,controller.blockPost);
  router.patch("/unblockpost/:postId" ,controller.unblockPost);

 
 
  return router;
};

export default adminRouter;
