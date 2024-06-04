import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faImage } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
  cancelFollowRequest,
  followUser,
  unfollowUser,
  acceptFollowRequests,
  rejectFollowRequests,
} from "../../utils/userRequestsHelper";
import Modal from "../../utils/Modal";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/Store/reduxStore";
import { getUserProfile } from "../../API/User/user";
import { getPostsLengthOfTheUser } from "../../API/Post/post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMapMarkedAlt } from "react-icons/fa";
import {
  dislikePost,
  fetchAllPostsForUserUsingUsername,
  likePost,
  savePost,
  getLikedPosts,
  getDislikedPosts,
  getPostLikesAndDislikesInfo,
} from "../../API/Post/post";
import { FiMoreVertical } from "react-icons/fi";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

interface UserInfo {
  coverPhoto: string;
  _id: string;
  username: string;
  name: string;
  dp: string;
  isPrivate: boolean;
  bio: string;
  createdAt?: string;
  posts?: any[];
  followers: { userId: string; username: string; followedAt: string }[];
  following?: { userId: string; username: string; followedAt: string }[];
  requestsForMe?: { userId: string; username: string; followedAt: string }[];
  requestedByMe?: { userId: string; username: string; followedAt: string }[];
}

const formatDate = (date: string | undefined) => {
  if (!date) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ProfilePageIndividualComponent: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  let navigate = useNavigate();

  if(username === currentUser?.username){
    navigate('/profile')
  }

  const [userDetails, setUserDetails] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [hasRequested, setHasRequested] = useState<boolean>(false);
  const [hasPendingRequest, setHasPendingRequest] = useState<boolean>(false);
  const [isMutualFollower, setIsMutualFollower] = useState<boolean>(false);
  const [followDate, setFollowDate] = useState<string | undefined>("");


  const [showFollowersModal, setShowFollowersModal] = useState(false); 
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  
  const handleOpenFollowersModal = () => {
    setShowFollowersModal(true);
  };

  const handleCloseFollowersModal = () => {
    setShowFollowersModal(false);
  };

  const handleOpenFollowingModal = () => {
    setShowFollowingModal(true);
  };

  const handleCloseFollowingModal = () => {
    setShowFollowingModal(false);
  };

  const [postCount, setPostCount] = useState(0);
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

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(username);
        setUserDetails(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [username]);

  useEffect(() => {
    if (userDetails) {
      const follower = userDetails.followers.find(
        f => f.userId === currentUser._id
      );
      const request = userDetails.requestedByMe?.find(
        r => r.userId === currentUser._id
      );
      const pendingRequest = userDetails.requestsForMe?.find(
        r => r.userId === currentUser._id
      );
      const mutualFollower =
        currentUser.followers.find(f => f.userId === userDetails._id) &&
        userDetails.followers.find(r => r.userId === currentUser._id);

      setIsFollower(!!follower);
      setHasRequested(!!request);
      setHasPendingRequest(!!pendingRequest);
      setIsMutualFollower(!!mutualFollower);

      if (follower) {
        setFollowDate(follower.followedAt);
      }
    }
  }, [userDetails, currentUser]);

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const count = await getPostsLengthOfTheUser(username);
        setPostCount(count.data);
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };
    fetchPostCount();
  }, [username]);

  const fetchUserPosts = async (username: string | undefined) => {
    try {
      if (username) {
        const response = await fetchAllPostsForUserUsingUsername(username);
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
    if (currentUser?._id) {
      fetchUserLikesAndDislikes(currentUser._id);
    }
  }, [currentUser?._id]);

  useEffect(() => {
    fetchUserPosts(username);
  }, [username]);

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach(post => fetchLikesDislikesData(post._id));
    }
  }, [posts]);

  const fetchLikesDislikesData = async (postId: string) => {
    try {
      const data = await getPostLikesAndDislikesInfo(postId);
      setLikesDislikesData(prev => ({ ...prev, [postId]: data }));
    } catch (error) {
      console.error("Error fetching likes and dislikes data:", error);
    }
  };

  const handleFollowUser = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    const res = await followUser(
      currentUser._id,
      targetUserId,
      targetUserUserName
    );
    if (res) {
      if (userDetails?.isPrivate) {
        setHasRequested(true);
      } else {
        setIsFollower(true);
      }
    }
  };

  const handleOnUnfollowUser = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to unfollow ${targetUserUserName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Unfollow",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await unfollowUser(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setIsFollower(false);
          setIsMutualFollower(false);
        }
      }
    });
  };

  const handleOnCancelRequest = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to cancel the follow request to ${targetUserUserName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Cancel Request",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await cancelFollowRequest(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setHasRequested(false);
        }
      }
    });
  };

  const handleAcceptUserRequest = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    const res = await acceptFollowRequests(
      currentUser._id,
      targetUserId,
      targetUserUserName
    );
    if (res) {
      setHasPendingRequest(false);
      setIsMutualFollower(true);
    }
  };

  const handleRejectUserRequest = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to reject the follow request from ${targetUserUserName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Reject Request",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await rejectFollowRequests(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setHasPendingRequest(false);
        }
      }
    });
  };

  const handleSavePost = async (postId: string) => {
    const response = await savePost(currentUser?._id, postId);
    if (response.status === "success") {
      toast.success("Post saved successfully");
    } else {
      toast.error("Error saving post");
    }
  };

  const handleLike = async (postId: string) => {
    const result = await likePost(currentUser._id, postId);

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
    const result = await dislikePost(currentUser._id, postId);

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

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => (
      <div className="w-5 h-0.5 rounded-lg mt-2 bg-gray-500 dark:bg-gray-500"></div>
    ),
    dotsClass: "slick-dots slick-thumb flex justify-center",
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return (
      <main className="flex-1 pt-2  overflow-auto no-scrollbar bg-gray-800 dark:bg-gray-700 text-white p-10">
        <div className="mx-auto h-screen rounded-lg shadow-lg bg-slate-200 dark:bg-slate-800 overflow-auto p-5 no-scrollbar">
          User not found
        </div>
      </main>
    );
  }

 

  return (
    <main className="flex-1 pt-2 p-2 overflow-auto no-scrollbar bg-gray-800 dark:bg-gray-700 text-white">
      <ToastContainer />
      <div className="mx-auto h-screen rounded-lg shadow-lg bg-slate-200 dark:bg-slate-800 overflow-auto no-scrollbar">
        <div className="bg-cover bg-center h-72">
          <img
            src={userDetails.coverPhoto || "/"}
            alt={`${userDetails.username}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center flex-col">
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-slate-600 -mt-16">
              <img
                src={userDetails.dp || "/default-profile.jpg"}
                alt={userDetails.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {userDetails.username}
                {userDetails.isPrivate && (
                  <FontAwesomeIcon
                    icon={faLock}
                    className="ml-2 text-green-500"
                    title="Private Account"
                  />
                )}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {userDetails.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Joined on: {formatDate(userDetails.createdAt)}
              </p>
              {userDetails.bio && (
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Bio: {userDetails.bio}
                </p>
              )}
              <div className="mt-4">
                <div className="inline-flex items-center mr-4">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="mr-2 text-gray-600"
                  />
                  <span className="text-gray-800 dark:text-gray-200">
                    {(postCount && postCount) || 0} Posts
                  </span>
                </div>
                <div className="inline-flex items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-gray-600"
                  />
                  <span
                    onClick={handleOpenFollowersModal}
                    className="text-gray-800 dark:text-gray-200 cursor-pointer">
                    {userDetails.followers.length} Followers
                  </span>
                </div>
                <div className="inline-flex items-center ml-4">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-gray-600"
                  />
                  <span
                    onClick={handleOpenFollowingModal}
                    className="text-gray-800 dark:text-gray-200 cursor-pointer">
                    {userDetails.following?.length || 0} Following
                  </span>
                </div>
              </div>
              <div className="mt-4">
                {isMutualFollower && (
                  <p className="text-green-500">
                    Following each other since {formatDate(followDate)}
                  </p>
                )}
                {isFollower && !isMutualFollower && (
                  <p className="text-green-500">You are following</p>
                )}
                {!isFollower && isMutualFollower && (
                  <p className="text-green-500">Following you</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            {userDetails.isPrivate ? (
              <>
                {!isFollower && !hasRequested && !hasPendingRequest && (
                  <button
                    onClick={() =>
                      handleFollowUser(userDetails._id, userDetails.username)
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Send Follow Request
                  </button>
                )}
                {hasRequested && (
                  <button
                    onClick={() =>
                      handleOnCancelRequest(
                        userDetails._id,
                        userDetails.username
                      )
                    }
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Cancel Request
                  </button>
                )}
                {hasPendingRequest && (
                  <>
                    <button
                      onClick={() =>
                        handleAcceptUserRequest(
                          userDetails._id,
                          userDetails.username
                        )
                      }
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Accept Request
                    </button>
                    <button
                      onClick={() =>
                        handleRejectUserRequest(
                          userDetails._id,
                          userDetails.username
                        )
                      }
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Reject Request
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {!isFollower && (
                  <button
                    onClick={() =>
                      handleFollowUser(userDetails._id, userDetails.username)
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Follow
                  </button>
                )}
              </>
            )}
            {isFollower && (
              <button
                onClick={() =>
                  handleOnUnfollowUser(userDetails._id, userDetails.username)
                }
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Unfollow
              </button>
            )}
          </div>
        </div>

        <div className="p-2">
          {!userDetails.isPrivate ||
          (userDetails.followers &&
            userDetails.followers.some(
              follower => follower.userId === currentUser._id
            )) ? (
              <div className="rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar   lg:grid lg:grid-cols-2    ">
              {posts.length > 0 ? (
                posts.map(post => (
                  <div
                    key={post._id}
                    className="p-2 m-2 border mb-4 rounded-lg bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <img
                          src={post.dp}
                          alt=""
                          className="rounded-full h-10 w-10"
                          onClick={() => navigate(`/profiles/${post.username}`)}
                        />
                        <div>
                          <p
                            className="font-bold"
                            onClick={() => navigate(`/profiles/${post.username}`)}>
                            {post.username}
                          </p>
                          {post.location && (
                            <p className="text-xs flex gap-2 m-1 text-gray-500 dark:text-gray-400 font-extralight">
                              <FaMapMarkedAlt /> {post.location}
                            </p>
                          )}
                          <p className="text-xs font-extralight text-gray-500 dark:text-gray-400">
                            {new Date(post.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          className="focus:outline-none mr-2"
                          onClick={() => toggleOptions(post._id)}>
                          <FiMoreVertical className="text-gray-500 dark:text-gray-400" />
                        </button>
                        {showOptions === post._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-xs border cursor-pointer border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                            <p
                              onClick={() => navigate(`/profiles/${post.username}`)}
                              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              View Profile
                            </p>
                            <p
                              onClick={() => navigate(`/reportPost/${post._id}`)}
                              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              Report Post
                            </p>
                            <p
                              onClick={() => handleSavePost(post._id)}
                              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              Save Post
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
      
                    {post.images.length > 0 && post.videos.length > 0 ? (
                      <Slider {...settings}>
                        {post.images.map((image: string, index: number) => (
                          <div key={index}>
                            <img
                              src={image}
                              alt={`Post image ${index}`}
                              className="w-full h-auto"
                            />
                          </div>
                        ))}
                        {post.videos.map((video: string, index: number) => (
                          <div key={index}>
                            <video
                              src={video}
                              controls
                              autoPlay
                              muted
                              className="w-full h-auto"
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : post.images.length > 0 ? (
                      post.images.length === 1 ? (
                        <img
                          src={post.images[0]}
                          alt={`Post image`}
                          className="w-full h-auto"
                        />
                      ) : (
                        <Slider {...settings}>
                          {post.images.map((image: string, index: number) => (
                            <div key={index}>
                              <img
                                src={image}
                                alt={`Post image ${index}`}
                                className="w-full h-auto"
                              />
                            </div>
                          ))}
                        </Slider>
                      )
                    ) : post.videos.length > 0 ? (
                      post.videos.length === 1 ? (
                        <video
                          src={post.videos[0]}
                          controls
                          autoPlay
                          muted
                          className="w-full h-auto"
                        />
                      ) : (
                        <Slider {...settings}>
                          {post.videos.map((video: string, index: number) => (
                            <div key={index}>
                              <video
                                src={video}
                                controls
                                autoPlay
                                muted
                                className="w-full h-auto"
                              />
                            </div>
                          ))}
                        </Slider>
                      )
                    ) : (
                      <p></p>
                    )}
                    <p className="mt-2 h">{post.captions}</p>
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center mt-4">
                        <button
                          className={`flex items-center space-x-2 hover:text-blue-600 ${
                            likedPosts[post._id]
                              ? "text-blue-600"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                          onClick={() => handleLike(post._id)}>
                          {likedPosts[post._id] ? (
                            <AiFillLike className="text-xl md:text-2xl lg:text-3xl" />
                          ) : (
                            <AiOutlineLike className="text-xl md:text-2xl lg:text-3xl" />
                          )}
                        </button>
                        <button
                          className={`flex items-center space-x-2 hover:text-red-600 ${
                            dislikedPosts[post._id]
                              ? "text-red-600"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                          onClick={() => handleDislike(post._id)}>
                          {dislikedPosts[post._id] ? (
                            <AiFillDislike className="text-xl md:text-2xl lg:text-3xl" />
                          ) : (
                            <AiOutlineDislike className="text-xl md:text-2xl lg:text-3xl" />
                          )}
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-600">
                          <AiOutlineComment className="text-xl md:text-2xl lg:text-3xl" />
                        </button>
                      </div>
                      <div className="flex gap-2 mt-4 cursor-pointer">
                        <p className="text-xs mt-2">
                          Likes:{" "}
                          {(likesDislikesData[post._id] &&
                            likesDislikesData[post._id].likesdislikesinfo
                              ?.likesCount) ||
                            0}
                        </p>
                        <p className="text-xs mt-2">|</p>
                        <p className="text-xs mt-2">
                          Disikes:{" "}
                          {(likesDislikesData[post._id] &&
                            likesDislikesData[post._id].likesdislikesinfo
                              ?.dislikesCount) ||
                            0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available</p>
              )}
            </div>
          ) : (
            <div className=" bg-slate-700 p-2 dark:bg-slate-900 font-bold text-lg rounded-lg">
              Can't view profile, please send friend request to view full profile
            </div>
          )}
        </div>

        <Modal
          isOpen={showFollowersModal}
          onClose={handleCloseFollowersModal}
          title="Followers"
          users={userDetails.followers}
        />
        <Modal
          isOpen={showFollowingModal}
          onClose={handleCloseFollowingModal}
          title="Following"
          users={userDetails.following}
        /> 
      </div>
    </main>
  );
};

export default ProfilePageIndividualComponent;
