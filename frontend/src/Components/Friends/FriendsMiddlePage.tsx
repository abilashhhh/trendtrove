import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/Store/reduxStore";
import { getAllUsers } from "../../API/User/user";
import { FaSearch } from "react-icons/fa";

import ProfileSectionFriendsPage from "./ProfileSectionFriendsPage";

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
  following?: { userId: string; followedAt?: string }[];
  requestsForMe?: { userId: string }[];
}

const FriendsMiddlePage: React.FC = () => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const [users, setUsers] = useState<User[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers.user);

        const savedActiveUser = localStorage.getItem("activeUser");
        if (
          savedActiveUser &&
          allUsers.user.some(user => user.username === savedActiveUser)
        ) {
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

  return (
    <>
      <ToastContainer />
      <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full ">
          
          <div className="flex flex-col md:flex-row gap-2 h-full">
            
            <div className="w-full sm:w-3/6 md:w-1/6 lg:w-2/6 rounded-lg flex flex-col overflow-y-auto no-scrollbar  text-black dark:text-white text-xl p-2 space-y-4">
              <div className="rounded-lg p-0.5 flex gap-1 h-12 min-w-full  ">
                <input
                  type="text"
                  onChange={e => e.target.value}
                  placeholder="Search here.."
                  className="bg-gray-800 text-white sm:w-4/6 md:w-4/6 lg:w-5/6 w-full rounded-lg   p-2"
                />

                <FaSearch className=" sm:w-/6 md:w-2/6 lg:w-1/6 h-full w-10 bg-gray-800 lg:p-3 sm:p-2 rounded-lg p-1" />
              </div>
<  div className="w-full rounded-lg flex flex-col overflow-y-auto no-scrollbar  text-black dark:text-white text-xl p-2 space-y-4 ">
{users.length > 0 ? (
                users.map(user => (
                  <div key={user._id} >
                    <button
                      onClick={() => setActiveSection(user.username)}
                      className={`w-full rounded-lg p-4 transition duration-300 ease-in-out shadow-md flex items-center space-x-4 ${
                        activeSection === user.username
                          ? "bg-gray-400 dark:bg-slate-600"
                          : "bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-500"
                      }`}>
                      <img
                        src={user.dp || "/default-profile.jpg"}
                        className="rounded-full w-12 h-12 object-cover"
                        alt={`${user.username}'s profile`}
                      />
                      <div className="flex-1 flex flex-col text-left">
                        <h3 className="font-semibold text-lg">
                          {user.username}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {user.name}
                        </p>
                      </div>
                    </button>
                    {activeSection === user.username && (
                      <div className="block sm:hidden mt-4">
                        <ProfileSectionFriendsPage
                          userDetails={user}
                          currentUser={currentUser}
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300 no-scrollbar">
                  No users found
                </p>
              )}
</div>
             
            </div>
            <div className="w-full md:w-5/6 overflow-auto no-scrollbar rounded-lg flex flex-col text-black dark:text-white text-xl">
              {activeSection ? (
                <div className="hidden md:block w-full overflow-auto no-scrollbar">
                  <ProfileSectionFriendsPage
                    userDetails={users.find(
                      user => user.username === activeSection
                    )}
                    currentUser={currentUser}
                  />
                </div>
              ) : (
                <div className="p-4 text-center">
                  Select a user to see details.
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
