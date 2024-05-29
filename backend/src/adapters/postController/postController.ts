import { Request, Response } from "express";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { PostDataInterface, ReportPost } from "../../types/postsInterface";
import { handleCreatePost, handleGetPostsForUser, handleReportPosts } from "../../application/use-cases/post/postAuthApplications";
import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { PostDBInterface } from "../../application/repositories/postDBRepository";

const postController = (
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  postDBRepositoryImplementation : PostRepositoryMongoDB,
  postDBRepositoryInterface : PostDBInterface,
  authServiceImplementation: AuthService,
  authenticationServiceInterface: AuthServiceInterface
) => {
  const dbUserRepository = userDBRepositoryInterface(
    userDBRepositoryImplementation()
  );
  const dbPostRepository = postDBRepositoryInterface(
    postDBRepositoryImplementation()
  );
  const authService = authenticationServiceInterface(
    authServiceImplementation()
  );

  const addPost = async (req: Request, res: Response) => {
    try {
      const postData: PostDataInterface = req.body;
      console.log(postData);
      const createPost = await handleCreatePost(postData, dbPostRepository, dbUserRepository);
      res.status(201).json({
        status: "success",
        message: "post created successfully",
        data: createPost,
      });
    } catch (error) {
      console.error("Error adding new post:", error);
      res.status(401).json({
        status: "error",
        message: "Failed to add new post info",
      });
    }
  };

  const getpostforuser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("Id received from frontend:", id);
      
      const getPosts  = await handleGetPostsForUser(id,dbPostRepository);
      console.log('getPosts:', getPosts);
      
      res.status(201).json({
        status: "success",
        message: "Posts fetched for user",
        data: getPosts,
      });
    } catch (error) {
      console.error("Error getting all posts for user:", error);
      res.status(401).json({
        status: "error",
        message: "Failed to get all posts",
      });
    }
  };

  const reportPost = async (req: Request, res: Response) => {
    try {
      const data : ReportPost  = req.body;
      console.log("reportPost data received from frontend:", data);
      
      const reportPost  = await handleReportPosts(data,dbPostRepository);
      console.log('reportPost:', reportPost);
      
      res.status(201).json({
        status: "success",
        message: "Posts reported successfully",
        data: reportPost,
      });
    } catch (error) {
      console.error("Error reporting posts for user:", error);
      res.status(401).json({
        status: "error",
        message: "Failed to report posts",
      });
    }
  };

  return {
    addPost,
    getpostforuser,
    reportPost
  };
};

export default postController;
