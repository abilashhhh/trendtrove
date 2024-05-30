import { Request, Response } from "express";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { PostDataInterface, ReportPost } from "../../types/postsInterface";
import { handleCreatePost, handleDislikePosts, handleGetDislikedPosts, handleGetLikedPosts, handleGetPostsForUser, handleGetlikesdislikesinfo, handleLikePosts, handleReportPosts, handleSavePosts } from "../../application/use-cases/post/postAuthApplications";
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


  const savePost = async (req: Request, res: Response) => {
    try {
      const {userId, postId}  = req.body;
      console.log("savePost data received from frontend:", userId, postId);
      
      const savePost  = await handleSavePosts(userId,postId,dbPostRepository);
      console.log('savePost:', savePost);
      
      res.status(201).json({
        status: "success",
        message: "Posts reported successfully",
        data: savePost,
      });
    } catch (error) {
      console.error("Error reporting posts for user:", error);
      res.status(401).json({
        status: "error",
        message: "Failed to report posts",
      });
    }
  };

  const likePost = async (req: Request, res: Response) => {
    try {
      const {userId, postId}  = req.body;
      console.log("likePost data received from frontend:", userId, postId);
      
      const likePost  = await handleLikePosts(userId,postId,dbPostRepository);
      console.log('likePost:', likePost);
      
      res.status(201).json({
        status: "success",
        message: "Posts liked successfully",
        data: likePost,
      });
    } catch (error) {
      console.error("Error liking posts for user:", error);
      res.status(401).json({
        status: "error",
        message: "Failed to like posts",
      });
    }
  };

  const dislikePost = async (req: Request, res: Response) => {
    try {
      const {userId, postId}  = req.body;
      console.log("dislikePost data received from frontend:", userId, postId);
      
      const dislikePost  = await handleDislikePosts(userId,postId,dbPostRepository);
      console.log('dislikePost:', dislikePost);
      
      res.status(201).json({
        status: "success",
        message: "Posts disliked successfully",
        data: dislikePost,
      });
    } catch (error) {
      console.error("Error disliking posts for user:", error);
      res.status(401).json({
        status: "error",
        message: "Failed to dislike posts",
      });
    }
  };
  const getlikedposts = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      console.log("Req.params on getlikedposts: ", req.params);
      console.log("getlikedposts data received from frontend:", userId);
  
      const likedPosts = await handleGetLikedPosts(userId, dbPostRepository);
      console.log('Liked posts:', likedPosts);
  
      res.status(200).json({ likedPosts });
    } catch (error) {
      console.error("Error getting liked posts for user:", error);
      res.status(500).json({ error: "Failed to get liked posts" });
    }
  };
  
  const getdislikedposts = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      console.log("Req.params on getdislikedposts: ", req.params);
      console.log("getdislikedposts data received from frontend:", userId);
  
      const dislikedPosts = await handleGetDislikedPosts(userId, dbPostRepository);
      console.log('Disliked posts:', dislikedPosts);
  
      res.status(200).json({ dislikedPosts });
    } catch (error) {
      console.error("Error getting disliked posts for user:", error);
      res.status(500).json({ error: "Failed to get disliked posts" });
    }
  };
  
  const getlikesdislikesinfo = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      console.log("Req.params on getlikesdislikesinfo: ", req.params);
      console.log("getlikesdislikesinfo data received from frontend:", postId);
  
      const likesdislikesinfo = await handleGetlikesdislikesinfo(postId, dbPostRepository);
      console.log('likesdislikesinfo:', likesdislikesinfo);
  
      res.status(200).json({ likesdislikesinfo });
    } catch (error) {
      console.error("Error getting likesdislikesinfo for posts :", error);
      res.status(500).json({ error: "Failed to get likesdislikesinfo for posts" });
    }
  };
  

  return {
    addPost,
    getpostforuser,
    reportPost,
    savePost,
    likePost,
    dislikePost,
    getlikedposts,
    getdislikedposts,
    getlikesdislikesinfo
  };
};

export default postController;
