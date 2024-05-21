import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/Store/reduxStore";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../API/User/user";

// Main Settings Page Component
const FriendsMiddlePage = () => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers(currentUser._id);
        console.log("result from get all users:",allUsers)
        setUsers(allUsers.user);
      } catch (error) {
        toast.error("Failed to load users");
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <ToastContainer />
      <main className="flex-1 min-h-screen pt-2 p-2 bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto">
          <h1 className="text-2xl font-semibold underline text-center mb-4">
            Find new friends
          </h1>
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <div className="w-full md:w-1/4 bg-gray-300 dark:bg-slate-700 rounded-lg flex flex-col text-black dark:text-white text-xl">
              <div className="p-4 space-y-4">
                {users.length > 0 ? (
                  users.map((user) => (
                    <button
                      key={user._id}
                      onClick={() => setActiveSection(user.username)}
                      className="bg-gray-400 dark:bg-slate-500 w-full rounded-lg p-4 hover:bg-gray-500 dark:hover:bg-slate-400 transition duration-300 ease-in-out shadow-md"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.dp || "/default-profile.jpg"}
                          className="rounded-full w-12 h-12 object-cover"
                          alt={`${user.username}'s profile`}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{user.username}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {user.name}
                          </p>
                        </div>
                        <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-sm">
                          Follow
                        </button>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No users found
                  </p>
                )}
              </div>
            </div>
            <div className="w-full md:w-3/4 bg-gray-300 dark:bg-slate-600 rounded-lg flex text-black dark:text-white text-xl h-full overflow-auto">
              {activeSection ? (
                <div className="p-4">Displaying content for {activeSection}</div>
              ) : (
                <div className="p-4 text-center">Select a user to see details</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FriendsMiddlePage;
