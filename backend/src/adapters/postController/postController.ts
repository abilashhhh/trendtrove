import { Request, Response } from "express";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { PostDataInterface } from "../../types/postsInterface";
import { handleCreatePost } from "../../application/use-cases/post/postAuthApplications";

const postController = (
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  authServiceImplementation: AuthService,
  authenticationServiceInterface: AuthServiceInterface
) => {
  const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
  const authService = authenticationServiceInterface(authServiceImplementation());

  const addPost = async (req: Request, res: Response) => {
    try {
      const postData: PostDataInterface = req.body;
      console.log(postData);
      const createPost = await handleCreatePost(postData,dbUserRepository);
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

  return {
    addPost,
  };
};

export default postController;
