// import { Request, Response } from "express";
// import { AuthService } from "../../frameworks/services/authenticationService";
// import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
// import { UserDBInterface } from "../../application/repositories/userDBRepository";
// import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
// import { PostDataInterface, ReportPost } from "../../types/postsInterface";
// import { handleCreatePost, handleDeltePosts, handleDislikePosts, handleGetDislikedPosts, handleGetLengthForUser, handleGetLikedPosts, handleGetParticularPost, handleGetPostsForUser, handleGetPostsForUserUsername, handleGetPostsOfCurrentUser, handleGetSavedPostsOfCurrentUser, handleGetlikesdislikesinfo, handleLikePosts, handleRemoveSavePosts, handleReportPosts, handleSavePosts, handleupdatepost } from "../../application/use-cases/post/postAuthApplications";
// import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
// import { PostDBInterface } from "../../application/repositories/postDBRepository";

// const postController = (
//   userDBRepositoryImplementation: UserRepositoryMongoDB,
//   userDBRepositoryInterface: UserDBInterface,
//   postDBRepositoryImplementation : PostRepositoryMongoDB,
//   postDBRepositoryInterface : PostDBInterface,
//   authServiceImplementation: AuthService,
//   authenticationServiceInterface: AuthServiceInterface
// ) => {
//   const dbUserRepository = userDBRepositoryInterface(
//     userDBRepositoryImplementation()
//   );
//   const dbPostRepository = postDBRepositoryInterface(
//     postDBRepositoryImplementation()
//   );
//   const authService = authenticationServiceInterface(
//     authServiceImplementation()
//   );

//   const addPost = async (req: Request, res: Response) => {
//     try {
//       const postData: PostDataInterface = req.body;
//       // console.log(postData);
//       const createPost = await handleCreatePost(postData, dbPostRepository, dbUserRepository);
//       res.status(201).json({
//         status: "success",
//         message: "post created successfully",
//         data: createPost,
//       });
//     } catch (error) {
//       console.error("Error adding new post:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to add new post info",
//       });
//     }
//   };

//   const updatepost = async (req: Request, res: Response) => {
//     try {
//       const postData: PostDataInterface = req.body;
//       // console.log(postData);
//       const createPost = await handleupdatepost(postData, dbPostRepository, dbUserRepository);
//       res.status(201).json({
//         status: "success",
//         message: "post updated successfully",
//         data: createPost,
//       });
//     } catch (error) {
//       console.error("Error updating post:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to update post info",
//       });
//     }
//   };

//   const getpostforuser = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       // console.log("Id received from frontend:", id);
      
//       const getPosts  = await handleGetPostsForUser(id,dbPostRepository);
//       // console.log('getPosts:', getPosts);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts fetched for user",
//         data: getPosts,
//       });
//     } catch (error) {
//       console.error("Error getting all posts for user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to get all posts",
//       });
//     }
//   };

//   const getpostforuserusername = async (req: Request, res: Response) => {
//     try {
//       const { username } = req.params;
//       // console.log("username received from frontend:", username);
      
//       const getPosts  = await handleGetPostsForUserUsername(username,dbPostRepository);
//       // console.log('getPosts:', getPosts);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts fetched for user",
//         data: getPosts,
//       });
//     } catch (error) {
//       console.error("Error getting all posts for user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to get all posts",
//       });
//     }
//   };

//   const getpostlengthofuser = async (req: Request, res: Response) => {
//     try {
//       const { username } = req.params;
//       // console.log("Id received from frontend:", username);
      
//       const getPostsLength  = await handleGetLengthForUser(username,dbPostRepository);
//       // console.log('getPostsLength:', getPostsLength);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts fetched for user",
//         data: getPostsLength,
//       });
//     } catch (error) {
//       console.error("Error getting all posts for user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to get all posts",
//       });
//     }
//   };

 

//   const getpostofcurrentuser = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       // console.log(" getpostofcurrentuserId received from frontend:", id);
      
//       const getPosts  = await handleGetPostsOfCurrentUser(id,dbPostRepository);
//       // console.log('getPosts:', getPosts);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts fetched for current user",
//         data: getPosts,
//       });
//     } catch (error) {
//       console.error("Error getting all posts of current user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to get all posts",
//       });
//     }
//   };

//   const getsavedpostofcurrentuser = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       // console.log(" getsavedpostofcurrentuser received from frontend:", id);
      
//       const getPosts  = await handleGetSavedPostsOfCurrentUser(id,dbPostRepository);
//       console.log('getPosts:', getPosts);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts fetched for current user",
//         data: getPosts,
//       });
//     } catch (error) {
//       console.error("Error getting all saved posts of current user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to get all posts",
//       });
//     }
//   };

//   const getparticularpostofcurrentuser = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       // console.log(" getparticularpostofcurrentuser received from frontend:", id);
      
//       const getPosts  = await handleGetParticularPost(id,dbPostRepository);
//       // console.log('getPosts:', getPosts);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts fetched for current user",
//         data: getPosts,
//       });
//     } catch (error) {
//       console.error("Error getting all posts of current user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to get all posts",
//       });
//     }
//   };

//   const reportPost = async (req: Request, res: Response) => {
//     try {
//       const data : ReportPost  = req.body;
//       // console.log("reportPost data received from frontend:", data);
      
//       const reportPost  = await handleReportPosts(data,dbPostRepository);
//       // console.log('reportPost:', reportPost);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts reported successfully",
//         data: reportPost,
//       });
//     } catch (error) {
//       console.error("Error reporting posts for user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to report posts",
//       });
//     }
//   };


//   const savePost = async (req: Request, res: Response) => {
//     try {
//       const {userId, postId}  = req.body;
//       // console.log("savePost data received from frontend:", userId, postId);
      
//       const savePost  = await handleSavePosts(userId,postId,dbPostRepository);
//       // console.log('savePost:', savePost);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts saved successfully",
//         data: savePost,
//       });
//     } catch (error) {
//       console.error("Error reporting posts for user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to save posts",
//       });
//     }
//   };

//   const removesavePost = async (req: Request, res: Response) => {
//     try {
//       const {userId, postId}  = req.body;
//       // console.log("removesavePost data received from frontend:", userId, postId);
      
//       const removesavePost  = await handleRemoveSavePosts(userId,postId,dbPostRepository);
//       // console.log('removesavePost:', removesavePost);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts removed from saved successfully",
//         data: removesavePost,
//       });
//     } catch (error) {
//       console.error("Error removing posts from saved:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to remove from saved posts",
//       });
//     }
//   };

//   const likePost = async (req: Request, res: Response) => {
//     try {
//       const {userId, postId}  = req.body;
//       // console.log("likePost data received from frontend:", userId, postId);
      
//       const likePost  = await handleLikePosts(userId,postId,dbPostRepository);
//       // console.log('likePost:', likePost);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts liked successfully",
//         data: likePost,
//       });
//     } catch (error) {
//       console.error("Error liking posts for user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to like posts",
//       });
//     }
//   };

//   const dislikePost = async (req: Request, res: Response) => {
//     try {
//       const {userId, postId}  = req.body;
//       // console.log("dislikePost data received from frontend:", userId, postId);
      
//       const dislikePost  = await handleDislikePosts(userId,postId,dbPostRepository);
//       // console.log('dislikePost:', dislikePost);
      
//       res.status(201).json({
//         status: "success",
//         message: "Posts disliked successfully",
//         data: dislikePost,
//       });
//     } catch (error) {
//       console.error("Error disliking posts for user:", error);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to dislike posts",
//       });
//     }
//   };
//   const getlikedposts = async (req: Request, res: Response) => {
//     try {
//       const { userId } = req.params;
//       // console.log("Req.params on getlikedposts: ", req.params);
//       // console.log("getlikedposts data received from frontend:", userId);
  
//       const likedPosts = await handleGetLikedPosts(userId, dbPostRepository);
//       // console.log('Liked posts:', likedPosts);
  
//       res.status(200).json({ likedPosts });
//     } catch (error) {
//       console.error("Error getting liked posts for user:", error);
//       res.status(500).json({ error: "Failed to get liked posts" });
//     }
//   };
  
//   const getdislikedposts = async (req: Request, res: Response) => {
//     try {
//       const { userId } = req.params;
//       // console.log("Req.params on getdislikedposts: ", req.params);
//       // console.log("getdislikedposts data received from frontend:", userId);
  
//       const dislikedPosts = await handleGetDislikedPosts(userId, dbPostRepository);
//       // console.log('Disliked posts:', dislikedPosts);
  
//       res.status(200).json({ dislikedPosts });
//     } catch (error) {
//       console.error("Error getting disliked posts for user:", error);
//       res.status(500).json({ error: "Failed to get disliked posts" });
//     }
//   };
  
//   const getlikesdislikesinfo = async (req: Request, res: Response) => {
//     try {
//       const { postId } = req.params;
//       // console.log("getlikesdislikesinfo data received from frontend:", postId);
  
//       const likesdislikesinfo = await handleGetlikesdislikesinfo(postId, dbPostRepository);
//       // console.log('likesdislikesinfo:', likesdislikesinfo);
  
//       res.status(200).json({ likesdislikesinfo });
//     } catch (error) {
//       console.error("Error getting likesdislikesinfo for posts :", error);
//       res.status(500).json({ error: "Failed to get likesdislikesinfo for posts" });
//     }
//   };

//   const deletepost = async (req: Request, res: Response) => {
//     try {
//       const { postId } = req.params;
//       // console.log("deletepost data received from frontend:", postId);
  
//       const deltePostResult = await handleDeltePosts(postId, dbPostRepository);
//       // console.log('deltePostResult:', deltePostResult);
  
//       res.status(200).json({ deltePostResult });
//     } catch (error) {
//       console.error("Error getting deltePostResult for posts :", error);
//       res.status(500).json({ error: "Failed to get deltePostResult" });
//     }
//   };
  

//   return {
//     addPost,
//     updatepost,
//     getpostforuser,
//     getpostforuserusername,
//     getpostlengthofuser,
//     getpostofcurrentuser,
//     getsavedpostofcurrentuser,
//     getparticularpostofcurrentuser,
//     reportPost,
//     savePost,
//     removesavePost,
//     likePost,
//     dislikePost,
//     getlikedposts,
//     getdislikedposts,
//     getlikesdislikesinfo,
//     deletepost
//   };
// };

// export default postController;


import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
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
  handleGetlikesdislikesinfo,
  handleLikePosts,
  handleRemoveSavePosts,
  handleReportPosts,
  handleSavePosts,
  handleupdatepost
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
  const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
  const dbPostRepository = postDBRepositoryInterface(postDBRepositoryImplementation());
  const authService = authenticationServiceInterface(authServiceImplementation());

  const addPost = asyncHandler(async (req: Request, res: Response) => {
    const postData: PostDataInterface = req.body;
    const createPost = await handleCreatePost(postData, dbPostRepository, dbUserRepository);
    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      data: createPost,
    });
  });

  const updatepost = asyncHandler(async (req: Request, res: Response) => {
    const postData: PostDataInterface = req.body;
    const createPost = await handleupdatepost(postData, dbPostRepository, dbUserRepository);
    res.status(201).json({
      status: "success",
      message: "Post updated successfully",
      data: createPost,
    });
  });

  const getpostforuser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const getPosts = await handleGetPostsForUser(id, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Posts fetched for user",
      data: getPosts,
    });
  });

  const getpostforuserusername = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const getPosts = await handleGetPostsForUserUsername(username, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Posts fetched for user",
      data: getPosts,
    });
  });

  const getpostlengthofuser = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const getPostsLength = await handleGetLengthForUser(username, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Posts fetched for user",
      data: getPostsLength,
    });
  });

  const getpostofcurrentuser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const getPosts = await handleGetPostsOfCurrentUser(id, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Posts fetched for current user",
      data: getPosts,
    });
  });

  const getsavedpostofcurrentuser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const getPosts = await handleGetSavedPostsOfCurrentUser(id, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Posts fetched for current user",
      data: getPosts,
    });
  });

  const getparticularpostofcurrentuser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const getPosts = await handleGetParticularPost(id, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Post fetched for current user",
      data: getPosts,
    });
  });

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
    const removesavePost = await handleRemoveSavePosts(userId, postId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Post removed from saved successfully",
      data: removesavePost,
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
    const dislikePost = await handleDislikePosts(userId, postId, dbPostRepository);
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
    const dislikedPosts = await handleGetDislikedPosts(userId, dbPostRepository);
    res.status(200).json({ dislikedPosts });
  });

  const getlikesdislikesinfo = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const likesdislikesinfo = await handleGetlikesdislikesinfo(postId, dbPostRepository);
    res.status(200).json({ likesdislikesinfo });
  });

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
    getparticularpostofcurrentuser,
    reportPost,
    savePost,
    removesavePost,
    likePost,
    dislikePost,
    getlikedposts,
    getdislikedposts,
    getlikesdislikesinfo,
    deletepost
  };
};

export default postController;
