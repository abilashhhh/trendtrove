import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { PostDataInterface, ReportPost } from "../../types/postsInterface";
import {
  handleCreatePost,
  handleDeltePosts,
  handleDislikePosts,
  handleGetDislikedPosts,
  handleGetLengthForUser,
  handleGetLikedPosts,
  handleGetParticularPost,
  handleGetPostsForUser,
  handleGetPostsForUserUsername,
  handleGetPostsOfCurrentUser,
  handleGetSavedPostsOfCurrentUser,
  handleGetTaggedPostsOfCurrentUser,
  handleGetlikesdislikesinfo,
  handleLikePosts,
  handleRemoveSavePosts,
  handleRemoveTaggedPosts,
  handleReportPosts,
  handleSavePosts,
  handleupdatepost,
} from "../../application/use-cases/post/postAuthApplications";
import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { PostDBInterface } from "../../application/repositories/postDBRepository";

const postController = (
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  postDBRepositoryImplementation: PostRepositoryMongoDB,
  postDBRepositoryInterface: PostDBInterface,
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

  const addPost = asyncHandler(async (req: Request, res: Response) => {
    const postData: PostDataInterface = req.body;
    const createPost = await handleCreatePost(
      postData,
      dbPostRepository,
      dbUserRepository
    );
    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      data: createPost,
    });
  });

  const updatepost = asyncHandler(async (req: Request, res: Response) => {
    const postData: PostDataInterface = req.body;
    const createPost = await handleupdatepost(
      postData,
      dbPostRepository,
      dbUserRepository
    );
    res.status(201).json({
      status: "success",
      message: "Post updated successfully",
      data: createPost,
    });
  });

  const getpostforuser = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;
    const getPosts = await handleGetPostsForUser(userId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Posts fetched for user",
      data: getPosts,
    });
  });

  const getpostforuserusername = asyncHandler(
    async (req: Request, res: Response) => {
      const { username } = req.params;
      const getPosts = await handleGetPostsForUserUsername(
        username,
        dbPostRepository
      );
      res.status(201).json({
        status: "success",
        message: "Posts fetched for user",
        data: getPosts,
      });
    }
  );

  const getpostlengthofuser = asyncHandler(
    async (req: Request, res: Response) => {
      const { username } = req.params;
      const getPostsLength = await handleGetLengthForUser(
        username,
        dbPostRepository
      );
      res.status(201).json({
        status: "success",
        message: "Posts fetched for user",
        data: getPostsLength,
      });
    }
  );

  const getpostofcurrentuser = asyncHandler(
    async (req: Request, res: Response) => {
      const { userId }: { userId: string } = req.body;
      const getPosts = await handleGetPostsOfCurrentUser(userId, dbPostRepository);
      res.status(201).json({
        status: "success",
        message: "Posts fetched for current user",
        data: getPosts,
      });
    }
  );

  const getsavedpostofcurrentuser = asyncHandler(
    async (req: Request, res: Response) => {
      const { userId }: { userId: string } = req.body;
      const getPosts = await handleGetSavedPostsOfCurrentUser(
        userId,
        dbPostRepository
      );
      res.status(201).json({
        status: "success",
        message: "Posts fetched for current user",
        data: getPosts,
      });
    }
  );

  const gettaggedpostofcurrentuser = asyncHandler(
    async (req: Request, res: Response) => {
      const { userId }: { userId: string } = req.body;
      const getPosts = await handleGetTaggedPostsOfCurrentUser(
        userId,
        dbPostRepository
      );
      res.status(201).json({
        status: "success",
        message: "Posts fetched for current user",
        data: getPosts,
      });
    }
  );

  const getparticularpostofcurrentuser = asyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const getPosts = await handleGetParticularPost(id, dbPostRepository);
      res.status(201).json({
        status: "success",
        message: "Post fetched for current user",
        data: getPosts,
      });
    }
  );

  const getPostUsingPostId = asyncHandler(
    async (req: Request, res: Response) => {
      const { postId } = req.params;
      const getPosts = await handleGetParticularPost(postId, dbPostRepository);
      res.status(201).json({
        status: "success",
        message: "Post fetched for current user",
        postData: getPosts,
      });
    }
  );

  const reportPost = asyncHandler(async (req: Request, res: Response) => {
    const data: ReportPost = req.body;
    const reportPost = await handleReportPosts(data, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Post reported successfully",
      data: reportPost,
    });
  });

  const savePost = asyncHandler(async (req: Request, res: Response) => {
    const { userId, postId } = req.body;
    const savePost = await handleSavePosts(userId, postId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Post saved successfully",
      data: savePost,
    });
  });

  const removesavePost = asyncHandler(async (req: Request, res: Response) => {
    const { userId, postId } = req.body;
    const removesavePost = await handleRemoveSavePosts(
      userId,
      postId,
      dbPostRepository
    );
    res.status(201).json({
      status: "success",
      message: "Post removed from saved successfully",
      data: removesavePost,
    });
  });
  const removetaggedpost = asyncHandler(async (req: Request, res: Response) => {
    const { userId, postId } = req.body;
    const removeTaggedPost = await handleRemoveTaggedPosts(
      userId,
      postId,
      dbPostRepository
    );
    res.status(201).json({
      status: "success",
      message: "Post removed from tags successfully",
      data: removeTaggedPost,
    });
  });

  const likePost = asyncHandler(async (req: Request, res: Response) => {
    const { userId, postId } = req.body;
    const likePost = await handleLikePosts(userId, postId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Post liked successfully",
      data: likePost,
    });
  });

  const dislikePost = asyncHandler(async (req: Request, res: Response) => {
    const { userId, postId } = req.body;
    const dislikePost = await handleDislikePosts(
      userId,
      postId,
      dbPostRepository
    );
    res.status(201).json({
      status: "success",
      message: "Post disliked successfully",
      data: dislikePost,
    });
  });

  const getlikedposts = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const likedPosts = await handleGetLikedPosts(userId, dbPostRepository);
    res.status(200).json({ likedPosts });
  });

  const getdislikedposts = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const dislikedPosts = await handleGetDislikedPosts(
      userId,
      dbPostRepository
    );
    res.status(200).json({ dislikedPosts });
  });

  const getlikesdislikesinfo = asyncHandler(
    async (req: Request, res: Response) => {
      const { postId } = req.params;
      const likesdislikesinfo = await handleGetlikesdislikesinfo(
        postId,
        dbPostRepository
      );
      res.status(200).json({ likesdislikesinfo });
    }
  );

  const deletepost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const deltePostResult = await handleDeltePosts(postId, dbPostRepository);
    res.status(200).json({ deltePostResult });
  });

  return {
    addPost,
    updatepost,
    getpostforuser,
    getpostforuserusername,
    getpostlengthofuser,
    getpostofcurrentuser,
    getsavedpostofcurrentuser,
    gettaggedpostofcurrentuser,
    getparticularpostofcurrentuser,
    getPostUsingPostId,
    reportPost,
    savePost,
    removesavePost,
    removetaggedpost,
    likePost,
    dislikePost,
    getlikedposts,
    getdislikedposts,
    getlikesdislikesinfo,
    deletepost,
  };
};

export default postController;
