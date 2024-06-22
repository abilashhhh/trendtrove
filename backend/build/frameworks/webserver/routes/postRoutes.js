"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const authenticationServiceInterface_1 = require("../../../application/services/authenticationServiceInterface");
const authenticationService_1 = require("../../services/authenticationService");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const userRepositoryDatabase_1 = require("../../database/mongodb/respositories/userRepositoryDatabase");
const postController_1 = __importDefault(require("../../../adapters/postController/postController"));
const postRepositoryDatabase_1 = require("../../database/mongodb/respositories/postRepositoryDatabase");
const postDBRepository_1 = require("../../../application/repositories/postDBRepository");
const postRouter = () => {
    const router = (0, express_1.default)();
    const controller = (0, postController_1.default)(userRepositoryDatabase_1.userRepositoryMongoDB, userDBRepository_1.userDBRepository, postRepositoryDatabase_1.postRepositoryMongoDB, postDBRepository_1.postDBRepository, authenticationService_1.authService, authenticationServiceInterface_1.authServiceInterface);
    router.post("/addpost", authMiddleware_1.default, controller.addPost);
    router.post("/updatepost", authMiddleware_1.default, controller.updatepost);
    router.get("/getpostforuser", authMiddleware_1.default, controller.getpostforuser);
    router.get("/getpostforuserusername/:username", authMiddleware_1.default, controller.getpostforuserusername);
    router.get("/getpostlengthofuser/:username", authMiddleware_1.default, controller.getpostlengthofuser);
    router.get("/getpostofcurrentuser", authMiddleware_1.default, controller.getpostofcurrentuser);
    router.get("/getsavedpostofcurrentuser", authMiddleware_1.default, controller.getsavedpostofcurrentuser);
    router.get("/gettaggedpostofcurrentuser", authMiddleware_1.default, controller.gettaggedpostofcurrentuser);
    router.get("/getparticularpost/:id", authMiddleware_1.default, controller.getparticularpostofcurrentuser);
    router.get("/getpostusingpostId/:postId", authMiddleware_1.default, controller.getPostUsingPostId);
    router.post("/reportpost", authMiddleware_1.default, controller.reportPost);
    router.post("/savepost", authMiddleware_1.default, controller.savePost);
    router.post("/removesavepost", authMiddleware_1.default, controller.removesavePost);
    router.post("/removetaggedpost", authMiddleware_1.default, controller.removetaggedpost);
    router.post("/likepost", authMiddleware_1.default, controller.likePost);
    router.post("/dislikepost", authMiddleware_1.default, controller.dislikePost);
    router.get("/getlikedposts/:userId", authMiddleware_1.default, controller.getlikedposts);
    router.get("/getdislikedposts/:userId", authMiddleware_1.default, controller.getdislikedposts);
    router.get("/getlikesdislikesinfo/:postId", authMiddleware_1.default, controller.getlikesdislikesinfo);
    router.delete("/deletepost/:postId", authMiddleware_1.default, controller.deletepost);
    router.get("/getallpublicpostsforexplore", authMiddleware_1.default, controller.getallpublicpostsforexplore);
    router.post("/generatecaption", authMiddleware_1.default, controller.generatecaption);
    router.patch("/darkmode", authMiddleware_1.default, controller.darkmode);
    router.patch("/leftsidebar", authMiddleware_1.default, controller.leftsidebar);
    router.patch("/rightsidebar", authMiddleware_1.default, controller.rightsidebar);
    // COMMENT
    router.post("/addcomment", authMiddleware_1.default, controller.addComment);
    router.get("/getallcomments/:postId", authMiddleware_1.default, controller.getallcomments);
    router.delete("/deletecomment/:commentId", authMiddleware_1.default, controller.deleteComment);
    router.put("/editcomment", authMiddleware_1.default, controller.editComment);
    router.post("/replytocomment", authMiddleware_1.default, controller.replytocomment);
    // STORIES 
    return router;
};
exports.default = postRouter;
