import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/Store/reduxStore";
import { getAllUsers } from "../../API/User/user";
import ProfileSectionFriendsPage from "./ProfileSectionFriendsPage";
import { followUser } from "../../utils/followUserHelper";

interface User {
  _id: string;
  username: string;
  name: string;
  dp: string;
  isPrivate: boolean;
  followers: { userId: string; followedAt?: string }[];
  bio: string;
  createdAt?: string;
  posts?: any[];
  following?: { userId: string, followedAt?: string }[];
  requestsForMe?: { userId: string }[];
}

const FriendsMiddlePage: React.FC = () => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const [users, setUsers] = useState<User[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [followRequests, setFollowRequests] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers(currentUser._id);
        console.log("result from get all users:", allUsers);
        console.log("current user:", currentUser);
        setUsers(allUsers.user);

        const savedActiveUser = localStorage.getItem("activeUser");
        if (savedActiveUser && allUsers.user.some(user => user.username === savedActiveUser)) {
          setActiveSection(savedActiveUser);
        } else if (allUsers.user.length > 0) {
          setActiveSection(allUsers.user[0].username);
        }
      } catch (error) {
        toast.error("Failed to load users");
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  useEffect(() => {
    if (activeSection) {
      localStorage.setItem("activeUser", activeSection);
    }
  }, [activeSection]);

  const handleFollowUser = async (userId: string, username: string) => {
    await followUser(currentUser, userId, username, users, setUsers, setFollowRequests);
    setActiveSection(username);
  };

  return (
    <>
      <ToastContainer />
      <main className="flex-1 min-h-screen pt-2 p-2 bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
          <h1 className="text-3xl font-bold underline text-center mb-6">
            Find New Friends
          </h1>
          <div className="flex flex-col md:flex-row gap-6 h-full">
            <div className="w-full md:w-1/4 bg-gray-300 dark:bg-slate-700 rounded-lg flex flex-col text-black dark:text-white text-xl p-4 space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id}>
                    <button
                      onClick={() => setActiveSection(user.username)}
                      className="bg-gray-400 dark:bg-slate-500 w-full rounded-lg p-4 hover:bg-gray-500 dark:hover:bg-slate-400 transition duration-300 ease-in-out shadow-md flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                      <img
                        src={user.dp || "/default-profile.jpg"}
                        className="rounded-full w-12 h-12 object-cover"
                        alt={`${user.username}'s profile`}
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-semibold text-lg">
                          {user.username}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {user.name}
                        </p>
                      </div>
                      <button
                        id={`followButton-${user._id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollowUser(user._id, user.username);
                        }}
                        className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-sm"
                        disabled={
                          followRequests.includes(user._id) ||
                          user.followers.some(
                            (follower) => follower.userId === currentUser._id
                          ) ||
                          user.requestsForMe?.some(
                            (request) => request.userId === currentUser._id
                          )
                        }
                      >
                        {user.followers.some(
                          (follower) => follower.userId === currentUser._id
                        )
                          ? "Following"
                          : user.requestsForMe?.some(
                              (request) =>
                                request.userId === currentUser._id
                            )
                          ? "Requested"
                          : "Follow"}
                      </button>
                    </button>
                    {activeSection === user.username && (
                      <div className="block sm:hidden">
                        <ProfileSectionFriendsPage
                          userDetails={
                            users.find((u) => u.username === activeSection)!
                          }
                          currentUser={currentUser}
                          onFollowUser={handleFollowUser}
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  No users found
                </p>
              )}
            </div>
            <div className="hidden md:block md:w-3/4 bg-gray-300 dark:bg-slate-600 rounded-lg p-4 flex text-black dark:text-white text-xl">
              {activeSection ? (
                <ProfileSectionFriendsPage
                  userDetails={
                    users.find((user) => user.username === activeSection)!
                  }
                  currentUser={currentUser}
                  onFollowUser={handleFollowUser}
                />
              ) : (
                <div className="p-4 text-center">
                  Select a user to see details
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FriendsMiddlePage;
