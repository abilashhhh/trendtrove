import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreType } from "../../Redux/Store/reduxStore";
import { getAllPostsForUser as fetchAllPostsForUser } from "../../API/Post/post";

const MiddleContainer: React.FC = () => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const [posts, setPosts] = useState<any[]>([]);

  console.log("Current user:", currentUser);

  const fetchUserPosts = async (id: string | undefined) => {
    try {
      if (id) {
        const response = await fetchAllPostsForUser(id);
        if (response && response.data) {
          setPosts(response.data);
          console.log("Got posts of users: ", response.data);
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

  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <ToastContainer />

      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-semibold">Home Page - Get new posts</h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="p-2 m-2 border rounded-lg">
              <p>{post.captions}</p>
              {post.images && post.images.length > 0 && (
                <img src={post.images[0]} alt="Post" className="w-full h-auto" />
              )}
            {post.videos && post.videos.length > 0 && (
  <video src={post.videos[0]} controls autoPlay muted loop className="w-full h-auto" />
)}

              <p>{new Date(post.createdAt).toLocaleString()}</p>
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
