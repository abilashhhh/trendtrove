import { PostDataInterface, ReportPost } from "../../../../types/postsInterface";

import Post from "../models/postModel";
import ReportPostModel from "../models/reportPostModel";
import User from "../models/userModel";
import Like from "../models/likePostModel";
import Dislike from "../models/dislikePostModel";

//////////////////////////////////////////////////////////

export const postRepositoryMongoDB = () => {
  //////////////////////////////////////////////////////////

  const addNewPost = async (postData: PostDataInterface) => {
    try {
      const newPost = new Post(postData);
      return await newPost.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error adding new post!");
    }
  };

  const updatePost = async ( postData: PostDataInterface) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postData.postId,
        postData,
        { new: true }
      );
      return updatedPost;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating post!");
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
      // console.log("followingOfRequestedUser: ", followingOfRequestedUser)
      if (!followingOfRequestedUser || !followingOfRequestedUser.following) {
        throw new Error("User not following anyone");
      }

      const followingUsersId = followingOfRequestedUser.following.map(
        follow => follow.userId
      );
      // console.log("followingUsersId Id s : ", followingUsersId)

      const userIdsToFetch = [...followingUsersId, id];
      console.log("User ids to fetch posts for:", userIdsToFetch);

      const gettingPosts = await Post.find({
        userId: { $in: userIdsToFetch },
      }).sort({ createdAt: -1 });    
      console.log("Getting posts beefore returning:", gettingPosts);

      return gettingPosts;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting all posts for user!");
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
  
      const gettingPosts = await Post.find({ userId: id }).sort({ createdAt: -1 });
      console.log("Getting posts before returning:", gettingPosts);
      return gettingPosts;
    } catch (error : any) {
      console.error(error.message);
      throw new Error("Error getting all posts of current user!");
    }
  };
   
  
  const getParticularPostsForCurrentUser = async (id: string) => {
    try {
      if (!id) {
        throw new Error("User ID is required");
      }      
      const gettingPosts = await Post.findById(id);
      console.log("Getting posts before returning:", gettingPosts);
      return gettingPosts;
    } catch (error : any) {
      console.error(error.message);
      throw new Error("Error getting all posts of current user!");
    }
  };
   
  const reportPostsForUser = async (data:  ReportPost) => {
    try {
      const newPeport = new ReportPostModel(data);
      return await newPeport.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error reporting new post!");
    }
  }



  const savePostsForUser = async (userId : string, postId:string) => {
    try {
      console.log("Data in postRepository, userId, postId: ", userId, postId);
  
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
  
      if (!user.savedPosts.includes(postId)) {
        user.savedPosts.push(postId);  
        await user.save();  
        console.log('Post saved successfully');
      } else {
        console.log('Post already saved');
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error saving post!");
    }
  };

  
const likePostsForUser = async (userId: string, postId: string) => {
  try {
    await Dislike.findOneAndDelete({ userId, postId });

    const like = new Like({ userId, postId });
    await like.save();

    console.log('Post liked successfully!');
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

    console.log('Post disliked successfully!');
  } catch (error) {
    console.error(error);
    throw new Error("Error disliking post!");
  }
};

const getLikedPosts = async (userId: string) => {
  try {
    const likedPosts = await Like.find({ userId });
    console.log("Liked posts:", likedPosts);
    return likedPosts;
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    throw new Error("Error fetching liked posts!");
  }
};

const getDislikedPosts = async (userId: string) => {
  try {
    const dislikedPosts = await Dislike.find({ userId });
    console.log("Disliked posts:", dislikedPosts);
    return dislikedPosts;
  } catch (error) {
    console.error("Error fetching disliked posts:", error);
    throw new Error("Error fetching disliked posts!");
  }
};

const getlikesdislikesInfo = async (postId: string) => {
  try {
    const likes = await Like.find({ postId }).populate('userId', 'username');
    const dislikes = await Dislike.find({ postId }).populate('userId', 'username');
const data = {
  postId : postId,
  likesCount: likes.length,
  dislikesCount: dislikes.length,
  likedUsers: likes.map(like => like.userId.username),
  dislikedUsers: dislikes.map(dislike => dislike.userId.username)
}
console.log("data on getlikesdislikesInfo : ", getlikesdislikesInfo)
return data
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
    console.log("Post deleted successfully:", deletedPost);
    return {status: "success" , message: "post deleted"};
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Error deleting post!");
  }
};

  ////////////////////////////////////////////////

  return {
    addNewPost,
    updatePost,
    getAllPostsForUser,
    getAllPostsForCurrentUser,
    getParticularPostsForCurrentUser,
    reportPostsForUser,
    savePostsForUser,
    likePostsForUser,
    dislikePostsForUser,
    getLikedPosts,
    getDislikedPosts,
    getlikesdislikesInfo,
    deltePostForUser
  };
};
//////////////////////////////////////////////////////////

export type PostRepositoryMongoDB = typeof postRepositoryMongoDB;
