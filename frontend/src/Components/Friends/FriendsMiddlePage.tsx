    // FriendsMiddlePage.tsx
    import React, { useEffect, useState } from "react";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import { useSelector } from "react-redux";
    import { StoreType } from "../../Redux/Store/reduxStore";
    import { getAllUsers } from "../../API/User/user";
    import { FaIdBadge, FaSearch } from "react-icons/fa";

    import ProfileSectionFriendsPage from "./ProfileSectionFriendsPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCrown } from "@fortawesome/free-solid-svg-icons";

    interface User {
      isPremium: any;
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
      const [searchUsers, setSearchedUsers] = useState<string>('');

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

      const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchUsers.toLowerCase()) || 
        user.name.toLowerCase().includes(searchUsers.toLowerCase()) 
      );

      return (
        <>
          <ToastContainer />
          <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full ">
              <div className="flex flex-col md:flex-row gap-2 h-full">
                <div className="w-full md:w-2/6  xl:w-1/6 rounded-lg flex flex-col text-black dark:text-white text-xl">
                  <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center">
                    <FaSearch className="w-8 h-8  bg-gray-200 dark:bg-gray-800 p-2 rounded-lg" />
                    <input
                      type="text"
                      onChange={e => setSearchedUsers(e.target.value)}
                      placeholder="Search here.."
                    className=" bg-gray-200 dark:bg-gray-800 text-white w-full p-2 rounded-lg mr-2 focus:outline-none "
                    />
                  </div>
                  <div className="overflow-y-auto no-scrollbar text-black dark:text-white text-xl p-2 space-y-4 ">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <div key={user._id}>
                          <button
                            onClick={() => setActiveSection(user.username)}
                            className={`w-full rounded-lg p-4 transition duration-300 ease-in-out shadow-md flex items-center space-x-4 ${
                              activeSection === user.username
                                ? "bg-gray-400 dark:bg-slate-600"
                                : "bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-500"
                            }`}
                          >
                            <img
                              src={user.dp || "/default-profile.jpg"}
                              className="rounded-full w-12 h-12 object-cover"
                              alt={`${user.username}'s profile`}
                            />
                            <div className="flex-1 flex flex-col text-left">
                              <h3 className="font-semibold text-lg">
                                {user.username}  {user.isPremium ?    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-blue-500"
                      /> :""}
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
                <div className="w-full md:w-4/6  xl:w-5/6 overflow-auto no-scrollbar  rounded-lg flex flex-col text-black dark:text-white text-xl">
                  {activeSection ? (
                    <div className="w-full overflow-auto no-scrollbar">
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
