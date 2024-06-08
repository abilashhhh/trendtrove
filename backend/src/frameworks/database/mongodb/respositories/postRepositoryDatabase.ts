import {
  PostDataInterface,
  ReportPostInterface,
} from "../../../../types/postsInterface";

import Post from "../models/postModel";
import ReportPost from "../models/reportPostModel";
import User from "../models/userModel";
import Like from "../models/likePostModel";
import Dislike from "../models/dislikePostModel";
import ErrorInApplication from "../../../../utils/ErrorInApplication";

//////////////////////////////////////////////////////////

export const postRepositoryMongoDB = () => {
  //////////////////////////////////////////////////////////

  const addNewPost = async (postData: PostDataInterface) => {
    try {
      const newPost = new Post(postData);
      const newPostData = await newPost.save();
      // console.log("newPostData: ",newPostData)

      await taggedDataFromPosts(newPostData?.mentions , newPostData?._id)

      return newPostData
    } catch (error) {
      // console.log(error);
      throw new Error("Error adding new post!");
    }
  };



  
  const updatePost = async (postData: PostDataInterface) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postData.postId,
        postData,
        { new: true }
      );
      return updatedPost;
    } catch (error) {
      // console.log(error);
      throw new Error("Error updating post!");
    }
  };

  const taggedDataFromPosts = async (usernames: string[], postId: string) => {
    try {
      console.log("Usrenamse : ", usernames)
      console.log("postId : ", postId)
      const updatePromises = usernames.map(username =>
        User.findOneAndUpdate(
          { username: username },
          { $push: { taggedPosts: { $each: [postId], $position: 0 } } },
          { new: true, upsert: true }
        )
      );
  
      await Promise.all(updatePromises);
    } catch (error) {
      console.error(error);  
      throw new Error("Error updating post - adding tags!");
    }
  };
  

  const getAllPostsForUser = async (id: string) => {
    try {
      const requesterUser = await User.findById(id);
      if (!requesterUser) {
        throw new Error("User not found");
      }

      const followingOfRequestedUser = await User.findById(id, {
        following: 1,
      }).exec();
      // // console.log("followingOfRequestedUser: ", followingOfRequestedUser)
      if (!followingOfRequestedUser || !followingOfRequestedUser.following) {
        throw new Error("User not following anyone");
      }

      const followingUsersId = followingOfRequestedUser.following.map(
        follow => follow.userId
      );
      // // console.log("followingUsersId Id s : ", followingUsersId)

      const userIdsToFetch = [...followingUsersId, id];
      // console.log("User ids to fetch posts for:", userIdsToFetch);

      const gettingPosts = await Post.find({
        userId: { $in: userIdsToFetch },
      }).sort({ createdAt: -1 });
      // console.log("Getting posts beefore returning:", gettingPosts);

      return gettingPosts;
    } catch (error) {
      // console.log(error);
      throw new Error("Error getting all posts for user!");
    }
  };
  const getAllPostsForUserUsername = async (username: string) => {
    try {
      const requesterUser = await User.findOne({ username: username });
      if (!requesterUser) {
        throw new Error("User not found");
      }

      const currentuserId = requesterUser._id;

      const gettingPosts = await Post.find({
        userId: currentuserId,
      }).sort({ createdAt: -1 });

      // console.log("Getting posts before returning:", gettingPosts);

      return gettingPosts;
    } catch (error) {
      // console.log(error);
      throw new Error("Error getting all posts for user!");
    }
  };

  const lengthofPostsForUser = async (username: string) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error("User not found");
      }

      const postCount = await Post.countDocuments({ userId: user._id });
      return postCount;
    } catch (error) {
      // console.log(error);
      throw new Error("Error getting length of posts for user!");
    }
  };

  const getAllPostsForCurrentUser = async (id: string) => {
    try {
      if (!id) {
        throw new Error("User ID is required");
      }

      const requesterUser = await User.findById(id);
      if (!requesterUser) {
        throw new Error("User not found");
      }

      const gettingPosts = await Post.find({ userId: id }).sort({
        createdAt: -1,
      });
      // console.log("Getting posts before returning:", gettingPosts);
      return gettingPosts;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error getting all posts of current user!");
    }
  };

  const getAllSavedPostsForCurrentUser = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const savedPostIds = user.savedPosts;

      if (!savedPostIds || savedPostIds.length === 0) {
        return [];
      }
      const savedPosts = await Post.find({ _id: { $in: savedPostIds } }).sort({
        createdAt: -1,
      });
      // console.log("savedposts: ", savedPosts);
      return savedPosts;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error getting saved posts of current user!");
    }
  };

  const getAllTaggedPostsForCurrentUser = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
  
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      // console.log("user: ", user  )
  
      const taggedPostIds = user.taggedPosts;
      // console.log("taggedPostIds:", taggedPostIds);
    
      const taggedPosts = await Post.find({ _id: { $in: taggedPostIds } }).sort({
        createdAt: -1,
      });
      // console.log("taggedPosts:", taggedPosts);
  
      return taggedPosts;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error getting tagged posts of current user!");
    }
  };
  
  const getParticularPostsForCurrentUser = async (id: string) => {
    try {
      if (!id) {
        throw new Error("User ID is required");
      }
      const gettingPosts = await Post.findById(id);
      // console.log("Getting posts before returning:", gettingPosts);
      return gettingPosts;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error getting all posts of current user!");
    }
  };

  const reportPostsForUser = async (data: ReportPostInterface) => {
    try {
      const newPeport = new ReportPost(data);
      return await newPeport.save();
    } catch (error) {
      // console.log(error);
      throw new Error("Error reporting new post!");
    }
  };

  const savePostsForUser = async (userId: string, postId: string) => {
    try {
      // console.log("Data in postRepository, userId, postId: ", userId, postId);

      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      if (!user.savedPosts.includes(postId)) {
        user.savedPosts.push(postId);
        await user.save();
        // console.log("Post saved successfully");
      } else {
        // console.log("Post already saved");
      }
    } catch (error) {
      // console.log(error);
      throw new Error("Error saving post!");
    }
  };

  const removeSavePostsForUser = async (userId: string, postId: string) => {
    try {
      // console.log("Data in postRepository, userId, postId: ", userId, postId);

      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      if (user.savedPosts.includes(postId)) {
        user.savedPosts.pull(postId);
        await user.save();
        // console.log("Post removed successfully from saved posts");
      } else {
        // console.log("Post not present in saved posts");
      }
    } catch (error) {
      // console.log(error);
      throw new Error("Error removing saved post!");
    }
  };

  const removeTaggedPostsForUser = async (userId: string, postId: string) => {
    try {
      // console.log("Data in postRepository, userId, postId: ", userId, postId);

      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      if (user.taggedPosts.includes(postId)) {
        user.taggedPosts.pull(postId);
        await user.save();
        // console.log("Post removed successfully from saved posts");
      } else {
        // console.log("Post not present in saved posts");
      }
    } catch (error) {
      // console.log(error);
      throw new Error("Error removing tags from post!");
    }
  };

  const likePostsForUser = async (userId: string, postId: string) => {
    try {
      await Dislike.findOneAndDelete({ userId, postId });

      const like = new Like({ userId, postId });
      await like.save();

      // console.log("Post liked successfully!");
    } catch (error) {
      console.error(error);
      throw new Error("Error liking post!");
    }
  };

  const dislikePostsForUser = async (userId: string, postId: string) => {
    try {
      await Like.findOneAndDelete({ userId, postId });

      const dislike = new Dislike({ userId, postId });
      await dislike.save();

      // console.log("Post disliked successfully!");
    } catch (error) {
      console.error(error);
      throw new Error("Error disliking post!");
    }
  };

  const getLikedPosts = async (userId: string) => {
    try {
      const likedPosts = await Like.find({ userId });
      // console.log("Liked posts:", likedPosts);
      return likedPosts;
    } catch (error) {
      console.error("Error fetching liked posts:", error);
      throw new Error("Error fetching liked posts!");
    }
  };

  const getDislikedPosts = async (userId: string) => {
    try {
      const dislikedPosts = await Dislike.find({ userId });
      // console.log("Disliked posts:", dislikedPosts);
      return dislikedPosts;
    } catch (error) {
      console.error("Error fetching disliked posts:", error);
      throw new Error("Error fetching disliked posts!");
    }
  };

  const getlikesdislikesInfo = async (postId: string) => {
    try {
      const likes = await Like.find({ postId }).populate("userId", "username");
      const dislikes = await Dislike.find({ postId }).populate(
        "userId",
        "username"
      );
      const data = {
        postId: postId,
        likesCount: likes.length,
        dislikesCount: dislikes.length,
        likedUsers: likes.map(like => like.userId.username),
        dislikedUsers: dislikes.map(dislike => dislike.userId.username),
      };
      // console.log("data on getlikesdislikesInfo : ", getlikesdislikesInfo);
      return data;
    } catch (error) {
      console.error("Error fetching disliked posts:", error);
      throw new Error("Error fetching disliked posts!");
    }
  };

  const deltePostForUser = async (postId: string) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        throw new Error("Post not found");
      }
      // console.log("Post deleted successfully:", deletedPost);
      return { status: "success", message: "post deleted" };
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Error deleting post!");
    }
  };

  const getPostById = async (postId: string) => {
    return await Post.findById(postId);
  };

  const blockPost = async (postId: string) => {
    const post = await Post.findByIdAndUpdate(
      postId,
      { isBlocked: true },
      { new: true }
    );
    if (!post) {
      throw new ErrorInApplication("Post not found", 404);
    }
    return post;
  };


  const unblockPost = async (postId: string) => {
    const post = await Post.findByIdAndUpdate(
      postId,
      { isBlocked: false },
      { new: true }
    );
    if (!post) {
      throw new ErrorInApplication("Post not found", 404);
    }
    return post;
  };
  ////////////////////////////////////////////////

  const removeAllTaggedPostsForAllUsers = async () => {
    try {
      // Update all users and set their taggedPosts array to an empty array
      await User.updateMany({}, { $set: { taggedPosts: [] } });
      
      console.log("All tagged posts removed for all users.");
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error removing tagged posts for all users!");
    }
  };
  
  // removeAllTaggedPostsForAllUsers()
  
  return {
    addNewPost,
    taggedDataFromPosts,
    getPostById,
    updatePost,
    getAllPostsForUser,
    getAllPostsForUserUsername,
    lengthofPostsForUser,
    getAllPostsForCurrentUser,
    getAllSavedPostsForCurrentUser,
    getAllTaggedPostsForCurrentUser,
    getParticularPostsForCurrentUser,
    reportPostsForUser,
    savePostsForUser,
    removeSavePostsForUser,
    removeTaggedPostsForUser,
    likePostsForUser,
    dislikePostsForUser,
    getLikedPosts,
    getDislikedPosts,
    getlikesdislikesInfo,
    deltePostForUser,
    blockPost,
    unblockPost,
  };
};
//////////////////////////////////////////////////////////

export type PostRepositoryMongoDB = typeof postRepositoryMongoDB;
