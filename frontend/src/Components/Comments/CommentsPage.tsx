import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import useUserDetails from "../../Hooks/useUserDetails";
import PostsDisplayCommon from "../Post/PostsDisplayCommon";
import { getPostUsingPostId } from "../../API/Post/post";
import LoadingSpinner from "../LoadingSpinner";
import { Post } from "../../Types/Post";
import MentionsHashtagsModal from "../../utils/MentionsHashtagsModal";
import LikesDislikesModal from "../../utils/LikesDislikesModal";
import { FaMapMarkedAlt, FaHashtag, FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import {
  dislikePost,
  getAllPostsForUser as fetchAllPostsForUser,
  likePost,
  savePost,
  getLikedPosts,
  getDislikedPosts,
  getPostLikesAndDislikesInfo,
} from "../../API/Post/post";
import { ToastContainer, toast } from "react-toastify";

const CommentsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const userDetails = useUserDetails();
  const navigate = useNavigate();
  const [post, setPostDetails] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [showModal, setShowModal] = useState(false);
  const [showingData, setShowingData] = useState("");
  const [modalHashtags, setModalHashtags] = useState<string[]>([]);

  const [showLikesDislikesModal, setShowLikesDislikesModal] = useState(false);
  const [showingDataLikesDislikes, setShowingDataLikesDislikes] = useState("");
  const [modalLikesDislikes, setModalLikesDislikes] = useState<string[]>([]);

  const [posts, setPosts] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [dislikedPosts, setDislikedPosts] = useState<{
    [key: string]: boolean;
  }>({});
  const [likesDislikesData, setLikesDislikesData] = useState<{
    [key: string]: {
      likesCount: number;
      dislikesCount: number;
      likedUsers: string[];
      dislikedUsers: string[];
    };
  }>({});

  const fetchLikesDislikesData = async (postId: string) => {
    try {
      const data = await getPostLikesAndDislikesInfo(postId);
      setLikesDislikesData(prev => ({ ...prev, [postId]: data }));
    } catch (error) {
      console.error("Error fetching likes and dislikes data:", error);
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach(post => fetchLikesDislikesData(post._id));
    }
  }, [posts]);

  const fetchUserPosts = async (id: string | undefined) => {
    try {
      if (id) {
        const response = await fetchAllPostsForUser();
        if (response && response.data) {
          setPosts(response.data);
        } else {
          console.log("No posts of users");
        }
      } else {
        console.log("User ID is undefined");
      }
    } catch (error) {
      console.log("Error getting new posts:", error);
    }
  };

  const fetchUserLikesAndDislikes = async (userId: string | undefined) => {
    try {
      if (userId) {
        const [likedResponse, dislikedResponse] = await Promise.all([
          getLikedPosts(userId),
          getDislikedPosts(userId),
        ]);

        if (likedResponse) {
          const likedPostsData = likedResponse.likedPosts.reduce(
            (acc: { [key: string]: boolean }, post: any) => {
              if (post.userId === userId) {
                acc[post.postId] = true;
              }
              return acc;
            },
            {}
          );
          setLikedPosts(likedPostsData);
        }

        if (dislikedResponse) {
          const dislikedPostsData = dislikedResponse.dislikedPosts.reduce(
            (acc: { [key: string]: boolean }, post: any) => {
              if (post.userId === userId) {
                acc[post.postId] = true;
              }
              return acc;
            },
            {}
          );
          setDislikedPosts(dislikedPostsData);
        }
      }
    } catch (error) {
      console.log("Error fetching liked and disliked posts:", error);
    }
  };

  useEffect(() => {
    if (userDetails?._id) {
      fetchUserPosts(userDetails?._id);
      fetchUserLikesAndDislikes(userDetails?._id);
    }
  }, [userDetails?._id]);

  const handleSavePost = async (postId: string) => {
    console.log("handleSavePost: ", postId);
    const response = await savePost(userDetails._id, postId);
    if (response.status === "success") {
      toast.success("Post saved successfully");
    } else {
      toast.error("Error saving post");
    }
  };

  const handleLike = async (postId: string) => {
    const result = await likePost(userDetails._id, postId);
    console.log("Result of handleLike: ", result);

    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    if (dislikedPosts[postId]) {
      setDislikedPosts(prev => ({
        ...prev,
        [postId]: false,
      }));
    }
    fetchLikesDislikesData(postId);
  };

  const handleDislike = async (postId: string) => {
    const result = await dislikePost(userDetails._id, postId);
    console.log("Result of handleDislike: ", result);

    setDislikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    if (likedPosts[postId]) {
      setLikedPosts(prev => ({
        ...prev,
        [postId]: false,
      }));
    }

    fetchLikesDislikesData(postId);
  };

  const toggleOptions = (postId: string) => {
    if (showOptions === postId) {
      setShowOptions(null);
    } else {
      setShowOptions(postId);
    }
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await getPostUsingPostId(postId);
        setPostDetails(response.postData);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);
 



  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <p>Post not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ToastContainer />
      <main className=" bg-gray-800 w-full dark:bg-gray-700 text-white">
        <div className="bg-gray-800 w-full h-full rounded-lg dark:bg-gray-700 text-white">
          <div className="flex flex-col lg:flex-row w-full h-full ">
            <div className="  p-2 m-2 flex justify-center align-middle items-center">
            <div className="lg:w-7/10   ">
              <div className="max-w-xl  h-full  rounded-lg m-2">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 mb-6">
                  <div className="flex items-center  mb-4 ">
                    <img
                      src={post.dp}
                      alt=""
                      className="rounded-full h-10 w-10 mr-4 cursor-pointer"
                      onClick={() => navigate(`/profiles/${post.username}`)}
                    />
                    <div>
                      <p
                        className="font-bold cursor-pointer"
                        onClick={() => navigate(`/profiles/${post.username}`)}
                      >
                        {post.username}
                      </p>
                      {post.location && (
                        <p className="text-xs flex items-center text-gray-500 dark:text-gray-400 font-light">
                          <FaMapMarkedAlt className="mr-1" /> {post.location}
                        </p>
                      )}
                      <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-auto relative">
                      <button
                        className="focus:outline-none"
                        onClick={() => toggleOptions(post._id)}
                      >
                        <FiMoreVertical className="text-gray-500 dark:text-gray-400" />
                      </button>
                      {showOptions === post._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-xs border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                          <p
                            className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => navigate(`/profiles/${post.username}`)}
                          >
                            View Profile
                          </p>
                          <p
                            className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => navigate(`/reportPost/${postId}`)}
                          >
                            Report Post
                          </p>
                          <p
                            className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => handleSavePost(postId)}
                          >
                            Save Post
                          </p>
                        </div>
                      )}
                    </div>
                  </div>


                  <PostsDisplayCommon post={post} />
                  
                  
                  <div className="flex justify-between ">
                    <div className="flex gap-2 items-center mt-4">
                      <button
                        className={`flex items-center space-x-2 hover:text-blue-600 ${
                          likedPosts[post._id]
                            ? "text-blue-600"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                        onClick={() => handleLike(post._id)}
                      >
                        {likedPosts[post._id] ? (
                          <AiFillLike
                            title="Like Post"
                            className="text-xl md:text-2xl lg:text-3xl"
                          />
                        ) : (
                          <AiOutlineLike
                            title="Like Post"
                            className="text-xl md:text-2xl lg:text-3xl"
                          />
                        )}
                      </button>
                      <button
                        className={`flex items-center space-x-2 hover:text-red-600 ${
                          dislikedPosts[post._id]
                            ? "text-red-600"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                        onClick={() => handleDislike(post._id)}
                      >
                        {dislikedPosts[post._id] ? (
                          <AiFillDislike
                            title="Dislike Post"
                            className="text-xl md:text-2xl lg:text-3xl"
                          />
                        ) : (
                          <AiOutlineDislike
                            title="Dislike Post"
                            className="text-xl md:text-2xl lg:text-3xl"
                          />
                        )}
                      </button>
                      <button
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-600"
                        onClick={() => navigate(`/post/${post._id}`)}
                      >
                        <AiOutlineComment
                          title="Add a comment"
                          className="text-xl md:text-2xl lg:text-3xl"
                        />
                      </button>
                    </div>
                    <div className="flex gap-5 text-center items-center justify-center">
                      <div className="flex gap-2 mt-4 cursor-pointer">
                        <div title="Hashtags">
                          <FaHashtag
                            className="bg-slate-200 dark:bg-slate-700 rounded-full p-1 size-6"
                            onClick={() => {
                              setShowModal(true);
                              setModalHashtags(post.hashtags);
                              setShowingData("Hashtags");
                            }}
                          />
                        </div>
                        <div title="Mentions">
                          <FaUser
                            className="bg-slate-200 dark:bg-slate-700 rounded-full p-1 size-6"
                            onClick={() => {
                              setShowModal(true);
                              setModalHashtags(post.mentions);
                              setShowingData("Mentions");
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 cursor-pointer">
                        <p
                          className="text-xs mt-2"
                          title="Likes count"
                          onClick={() => {
                            setShowLikesDislikesModal(true);
                            setModalLikesDislikes(
                              likesDislikesData[post._id].likesdislikesinfo
                              ?.likedUsers
                          );
                            
                            setShowingDataLikesDislikes("Liked Users");
                          }}
                        >
                          Likes:  {(likesDislikesData[post._id] &&
                        likesDislikesData[post._id].likesdislikesinfo
                          ?.likesCount) ||
                        0}
                        </p>
                        <p className="text-xs mt-2">|</p>
                        <p
                          className="text-xs mt-2"
                          title="Dislikes count"
                          onClick={() => {
                            setShowLikesDislikesModal(true);
                            setModalLikesDislikes(
                              likesDislikesData[post._id].likesdislikesinfo
                              ?.dislikedUsers
                          );
                            setShowingDataLikesDislikes("Disliked Users");
                          }}
                        >
                          Dislikes: {(likesDislikesData[post._id] &&
                        likesDislikesData[post._id].likesdislikesinfo
                          ?.dislikesCount) ||
                        0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className="bg-gray-600 lg:w-3/10 p-2 m-2 rounded-lg dark:bg-gray-800 lg:w-full">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
            </div>
          </div>
        </div>
  
        <MentionsHashtagsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={showingData}
          data={modalHashtags}
        />
        <LikesDislikesModal
          isOpen={showLikesDislikesModal}
          onClose={() => setShowLikesDislikesModal(false)}
          title={showingDataLikesDislikes}
          data={modalLikesDislikes}
        />
      </main>
    </Layout>
  );
  };
  
  export default CommentsPage;