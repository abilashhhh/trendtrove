import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreType } from "../../Redux/Store/reduxStore";
import { getAllPostsForUser as fetchAllPostsForUser } from "../../API/Post/post"; 

const MiddleContainer: React.FC = () => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  console.log("Current user:", currentUser);

  const fetchUserPosts = async (id: string | undefined) => {
    try {
      if (id) {
        const allPostsForUser = await fetchAllPostsForUser(id);
        if (allPostsForUser !== null) {
          console.log("Got posts of users: ", allPostsForUser);
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
    fetchUserPosts(currentUser?._id);
  }, [currentUser?._id]);

  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <ToastContainer />

      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-semibold">Home Page - Get new posts</h1>
      </div>
    </main>
  );
};

export default MiddleContainer;
