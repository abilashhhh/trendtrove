import { PostDataInterface, ReportPost } from "../../../../types/postsInterface";

import Post from "../models/postModel";
import ReportPostModel from "../models/reportPostModel";
import User from "../models/userModel";

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


  const reportPostsForUser = async (data:  ReportPost) => {
    try {
      const newPeport = new ReportPostModel(data);
      return await newPeport.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error reporting new post!");
    }
  }



  ////////////////////////////////////////////////

  return {
    addNewPost,
    getAllPostsForUser,
    reportPostsForUser
  };
};
//////////////////////////////////////////////////////////

export type PostRepositoryMongoDB = typeof postRepositoryMongoDB;
