import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/Store/reduxStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from 'sweetalert2';
import {
  dislikePost,
  likePost,
  getLikedPosts,
  getDislikedPosts,
  getPostLikesAndDislikesInfo,
  fetchPostsOfTheCurrentUser,
  deletePostForUser,
} from "../../API/Post/post";
import { FiMoreVertical } from "react-icons/fi";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";

const   PostInProfilePage = () => {
  const [activeSection, setActiveSection] = useState("MY POSTS");
  const navigate = useNavigate();

  const sections = ["MY POSTS", "SAVED POSTS", "TAGGED POSTS"];
  const [posts, setPosts] = useState<any[]>([]);
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [dislikedPosts, setDislikedPosts] = useState<{ [key: string]: boolean }>({});
  const [likesDislikesData, setLikesDislikesData] = useState<{ [key: string]: { likesCount: number; dislikesCount: number; likedUsers: string[]; dislikedUsers: string[]; }; }>({});

  const fetchUserLikesAndDislikes = async (userId: string | undefined) => {
    try {
      if (userId) {
        const [likedResponse, dislikedResponse] = await Promise.all([
          getLikedPosts(userId),
          getDislikedPosts(userId),
        ]);

        console.log("Liked posts:", likedResponse);
        console.log("Disliked posts:", dislikedResponse);

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
      const fetchData = async () => {
        const data = await fetchPostsOfTheCurrentUser(currentUser._id);
        console.log("data : ", data);
        if (data) {
          setPosts(data);
        }
        fetchUserLikesAndDislikes(currentUser._id);
      };
      fetchData();
    }
  }, [currentUser?._id]);

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

  const handleLike = async (postId: string) => {
    const result = await likePost(currentUser._id, postId);
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
    const result = await dislikePost(currentUser._id, postId);
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

  const [showOptions, setShowOptions] = useState<string | null>(null);

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

  const handleDeletePost = async (postId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
       
        console.log('Deleting post, postId:', postId);
   await deletePostForUser(postId)
   
   Swal.fire(
     'Deleted!',
     'Your post has been deleted.',
     'success'
    );
    window.location.reload()
        
        
      }
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between px-8 py-2 mt-2 rounded-lg shadow-lg gap-4">
        <ToastContainer />

        {sections.map((section) => (
          <button
            key={section}
            className={`p-3 rounded-lg border-2 font-bold ${activeSection === section ? "bg-blue-500 text-white border-blue-500" : "bg-slate-300 text-black dark:text-white dark:bg-slate-900 border-red-500"}`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="mt-4 p-2 bg-white text-black dark:text-white dark:bg-slate-700 rounded-lg shadow-lg">
        {activeSection === "MY POSTS" &&
          <div className="rounded-lg bg-gray-100  lg:grid lg:grid-cols-2 gap-1 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar  justify-center">
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
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-xs border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                      <p
                        onClick={() => navigate(`/editpost/${post._id}`)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Edit Post
                      </p>
                      <p
                        onClick={() => handleDeletePost(post._id)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        Delete Post
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
                  <p className="mt-2">{post.captions}</p>
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center mt-4">
                      <button
                        className={`flex items-center space-x-2 hover:text-blue-600 ${likedPosts[post._id] ? "text-blue-600" : "text-gray-600 dark:text-gray-400"}`}
                        onClick={() => handleLike(post._id)}>
                        {likedPosts[post._id] ? (
                          <AiFillLike className="text-xl md:text-2xl lg:text-3xl" />
                        ) : (
                          <AiOutlineLike className="text-xl md:text-2xl lg:text-3xl" />
                        )}
                      </button>
                      <button
                        className={`flex items-center space-x-2 hover:text-red-600 ${dislikedPosts[post._id] ? "text-red-600" : "text-gray-600 dark:text-gray-400"}`}
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
                        Likes: {" "}
                        {(likesDislikesData[post._id] &&
                      likesDislikesData[post._id].likesdislikesinfo
                        ?.likesCount) ||
                      0}
                      </p>
                      <p className="text-xs mt-2">|</p>
                      <p className="text-xs mt-2">
                        Dislikes: {" "}
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
        }

        {activeSection === "SAVED POSTS" && <div>Saved posts content here</div>}
        {activeSection === "TAGGED POSTS" && <div>Tagged posts content here</div>}
      </div>
    </>
  );
}

export default PostInProfilePage;
