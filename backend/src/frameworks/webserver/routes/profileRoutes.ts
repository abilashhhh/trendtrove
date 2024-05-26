import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import profileController from "../../../adapters/profileController/profileController";
// import { cloudinaryService } from "../../services/cloudinaryService";
// import { cloudinaryServiceInterface } from "../../../application/services/cloudinaryServiceInterface";
// import uploadToMulter from "../middlewares/multer";

const profileRouter = () => {
  const router = express();

  const controller = profileController(
    // cloudinaryService,
    // cloudinaryServiceInterface,
    userRepositoryMongoDB,
    userDBRepository,
    authService,
    authServiceInterface
  );

  router.get("/getuserinfo/:id" ,authMiddleware , controller.getUserInfo);
  router.patch("/editprofile" ,authMiddleware , controller.editProfile);
  router.patch("/changepassword" , authMiddleware ,controller.changePassword);
  router.delete("/deleteaccount/:id/:password" ,authMiddleware ,controller.deleteAccount);
  router.patch("/suspendaccount/:id/:password" ,authMiddleware ,controller.suspendAccount);
  router.patch("/privateaccount/:id/:password" ,authMiddleware ,controller.privateAccount);
  // router.post('/uploaddp' ,authMiddleware , uploadToMulter.single('file'), controller.uploaddp )
  // router.post('/uploadcover' , authMiddleware ,uploadToMulter.single('file'), controller.uploadCover )
 
  return router;
};

export default profileRouter;
