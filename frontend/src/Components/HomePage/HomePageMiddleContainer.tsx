import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StoreType } from "../../Redux/Store/reduxStore";
import { getAllPostsForUser as fetchAllPostsForUser } from "../../API/Post/post";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment, AiFillLike, AiFillDislike } from "react-icons/ai";

const MiddleContainer: React.FC = () => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const [posts, setPosts] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [dislikedPosts, setDislikedPosts] = useState<{ [key: string]: boolean }>({});

  const fetchUserPosts = async (id: string | undefined) => {
    try {
      if (id) {
        const response = await fetchAllPostsForUser(id);
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

  useEffect(() => {
    if (currentUser?._id) {
      fetchUserPosts(currentUser._id);
    }
  }, [currentUser?._id]);

  const handleLike = (postId: string) => {
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
  };

  const redirectToUserProfile = () => {
    console.log("Redirect to user profile . full page profile")
  }

  const handleDislike = (postId: string) => {
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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-white">
      <ToastContainer />

      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className="p-2 m-2 border rounded-lg bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 cursor-pointer " onClick={redirectToUserProfile}>
                  <img
                    src={post.dp}
                    alt=""
                    className="rounded-full m-2 h-10 w-10"
                  />
                  <div>
                    <p className="font-bold">{post.username}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-extralight">{post.location}</p>
                    <p className="text-xs font-extralight text-gray-500 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    className="focus:outline-none mr-2"
                    onClick={() => toggleOptions(post._id)}
                  >
                    <FiMoreVertical className="text-gray-500 dark:text-gray-400" />
                  </button>
                  {showOptions === post._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800  text-xs border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                      <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">View Profile</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Report Post</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Save Post</a>
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
              <p className="mt-2">{post.captions}</p>
              <div className="flex gap-2 items-center mt-4">
                <button
                  className={`flex items-center space-x-2 hover:text-blue-600 ${likedPosts[post._id] ? "text-blue-600" : "text-gray-600 dark:text-gray-400"}`}
                  onClick={() => handleLike(post._id)}
                >
                  {likedPosts[post._id] ? <AiFillLike /> : <AiOutlineLike />}
                </button>
                <button
                  className={`flex items-center space-x-2 hover:text-red-600 ${dislikedPosts[post._id] ? "text-red-600" : "text-gray-600 dark:text-gray-400"}`}
                  onClick={() => handleDislike(post._id)}
                >
                  {dislikedPosts[post._id] ? <AiFillDislike /> : <AiOutlineDislike />}
                </button>
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-600">
                  <AiOutlineComment />
                </button>
              </div>
            <div className="flex gap-2">  <p className="text-xs mt-2">Liked by </p>
            <p className="text-xs mt-2">|</p>
            <p className="text-xs mt-2">Disliked by </p></div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </main>
  );
};

export default MiddleContainer;
