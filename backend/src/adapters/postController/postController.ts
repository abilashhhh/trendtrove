import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { PostDataInterface,  ReportPostInterface, StoryInterface, highlightsInterface } from "../../types/postsInterface";
import {
  handleCreateComment,
  handleCreateHighlights,
  handleCreatePost,
  handleCreateStory,
  handleDarkMode,
  handleDelteComment,
  handleDeltePosts,
  handleDislikePosts,
  handleEditComments,
  handleGenerateCaption,
  handleGetAllComments,
  handleGetAllPublicPosts,
  handleGetDislikedPosts,
  handleGetHighlightsData,
  handleGetLengthForUser,
  handleGetLikedPosts,
  handleGetParticularPost,
  handleGetPostsForUser,
  handleGetPostsForUserUsername,
  handleGetPostsOfCurrentUser,
  handleGetSavedPostsOfCurrentUser,
  handleGetStoriesForHighlights,
  handleGetStoriesForUser,
  handleGetTaggedPostsOfCurrentUser,
  handleGetlikesdislikesinfo,
  handleLeftSidebar,
  handleLikePosts,
  handleRemoveSavePosts,
  handleRemoveStoryFromHighlighted,
  handleRemoveTaggedPosts,
  handleReplyToComment,
  handleReportPosts,
  handleRightSidebar,
  handleSavePosts,
  handleSetStoryToHighlighted,
  handleupdatepost,
} from "../../application/use-cases/post/postAuthApplications";
import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { PostDBInterface } from "../../application/repositories/postDBRepository";
import {  CommentInterface, ReplyInterface } from "../../types/commentInterface";

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

  const addStory = asyncHandler(async (req: Request, res: Response) => {
    const storyData: StoryInterface = req.body;
    console.log("story data: ", storyData)
    const createStory = await handleCreateStory(
      storyData,
      dbPostRepository,
      dbUserRepository
    );
    console.log("createStory: ", createStory)
    res.status(201).json({
      status: "success",
      message: "Story created successfully",
      data: createStory,
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
    const data: ReportPostInterface = req.body;
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

  const getallpublicpostsforexplore = asyncHandler(async (req: Request, res: Response) => {
    try {
    const { userId }: { userId: string } = req.body;

      const allPosts = await handleGetAllPublicPosts(userId, dbPostRepository);
      res.status(200).json({ allPosts });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch public posts", error });
    }
  });

 const generatecaption = asyncHandler(async (req: Request, res: Response) => {
    try {

      console.log("reached generate caption")
      const { imageurl } = req.body;
      const { userId } = req.body;
  
      console.log("Image URL in backend:", imageurl);
      console.log("User ID:", userId);
  
      const caption = await handleGenerateCaption(imageurl, userId);
      console.log("Caption:", caption);
  
      res.status(200).json({ caption });
    } catch (error) {
      console.error("Error generating caption:", error);
      res.status(500).json({ message: "Failed to generate caption for post", error });
    }
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

 

  const addComment = asyncHandler(async (req: Request, res: Response) => {
    const commentData: CommentInterface = req.body;
    console.log("COmment data in add Comment controller : ", commentData)
    const createComment = await handleCreateComment(
      commentData,
      dbPostRepository,
      dbUserRepository
    );
    res.status(201).json({
      status: "success",
      message: "Comment created successfully",
      data: createComment,
    });
  });

  const replytocomment = asyncHandler(async (req: Request, res: Response) => {
    const replyData: ReplyInterface = req.body;
    console.log("Reply data in controller : ", replyData)
    const createReply = await handleReplyToComment(
      replyData,
      dbPostRepository,
      dbUserRepository
    );
    res.status(201).json({
      status: "success",
      message: "Reply added successfully",
      data: createReply,
    });
  });

  
  const getallcomments = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const allComments = await handleGetAllComments(postId, dbPostRepository);
    // console.log("All commens t0 send back : ", allComments)
    res.status(201).json({
      status: "success",
      message: "All comments fetched for the post ",
      data: allComments,
    });
  });

  const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const deleteComment = await handleDelteComment(commentId, dbPostRepository);
    res.status(200).json({ deleteComment });
  });


  const editComment = asyncHandler(async (req: Request, res: Response) => {
    const { commentId, updatedText } = req.body;  
    console.log("handleEditComments:", commentId, updatedText);

    try {
      const allComments = await handleEditComments(commentId, updatedText, dbPostRepository);
      res.status(201).json({
        status: "success",
        message: "All comments edited for the post",
        data: allComments,
      });
    } catch (error : any) {
      res.status(error.status || 500).json({
        status: "error",
        message: error.message || "Failed to edit comments",
      });
    }
  });

  const darkmode = asyncHandler(async (req: Request, res: Response) => {
       const { userId }: { userId: string } = req.body;
    try {
      const modesResult = await handleDarkMode(userId,dbPostRepository);
      res.status(201).json({
        status: "success",
        message: "Dark mode set successfully",
      });
    } catch (error : any) {
      res.status(error.status || 500).json({
        status: "error",
        message: error.message || "Failed to set dark mode",
      });
    }
  });


  const leftsidebar = asyncHandler(async (req: Request, res: Response) => {
       const { userId }: { userId: string } = req.body;
    try {
      const modesResult = await handleLeftSidebar(userId, dbPostRepository );
      res.status(201).json({
        status: "success",
        message: "handleLeftSidebar updated successfully",
      });
    } catch (error : any) {
      res.status(error.status || 500).json({
        status: "error",
        message: error.message || "Failed to handleLeftSidebar",
      });
    }
  });
  
  const rightsidebar = asyncHandler(async (req: Request, res: Response) => {
       const { userId }: { userId: string } = req.body;
    try {
      const modesResult = await handleRightSidebar(userId, dbPostRepository);
      res.status(201).json({
        status: "success",
        message: "handleRightSidebar updated successfully",
      });
    } catch (error : any) {
      res.status(error.status || 500).json({
        status: "error",
        message: error.message || "Failed to handleRightSidebar",
      });
    }
  });
  
  
  const getstories = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;
    const getStoriesData = await handleGetStoriesForUser(userId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Stories fetched for user",
      data: getStoriesData,
    });
  });

  const getStoriesForHighlights = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;
    const getStoriesData = await handleGetStoriesForHighlights(userId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Stories fetched for user highlights",
      data: getStoriesData,
    });
  });

  const getHighlightsData = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;

    console.log("getHighlightsData Userid: ", userId)
    const getHighlightsDataUser = await handleGetHighlightsData(userId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Highlights Data fetched for user highlights",
      data: getHighlightsDataUser,
    });
  });

  const createstoryhighlights = asyncHandler(async (req: Request, res: Response) => {
    const payload :  highlightsInterface = req.body

    // console.log("Payload: create highlight : ", payload)

    const getStoriesData = await handleCreateHighlights(payload, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Highlights created successfully",
      data: getStoriesData,
    });
  });

  const setStoryToHighlighted = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;
    const {storyId } :{storyId : string} =  req.body
    const getStoriesData = await handleSetStoryToHighlighted(userId, storyId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Story set to user highlights",
      data: getStoriesData,
    });
  });

  const removeStoryFromHighlighted = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;
    const {storyId } :{storyId : string} =  req.body
    const getStoriesData = await handleRemoveStoryFromHighlighted(userId, storyId, dbPostRepository);
    res.status(201).json({
      status: "success",
      message: "Story removed from  user highlights",
      data: getStoriesData,
    });
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
    generatecaption,
    reportPost,
    savePost,
    removesavePost,
    removetaggedpost,
    likePost,
    dislikePost,
    getlikedposts,
    getallpublicpostsforexplore,
    getdislikedposts,
    getlikesdislikesinfo,
    deletepost,
    addComment,
    getallcomments,
    deleteComment,
    editComment,
    replytocomment,
    darkmode,
    leftsidebar,
    rightsidebar,
    addStory,
    getstories,
    createstoryhighlights,
    getStoriesForHighlights,
    getHighlightsData,
    setStoryToHighlighted,
    removeStoryFromHighlighted,
  };
};

export default postController;
