import React, { useEffect, useState } from "react";
import {
  getAllUsersForAdmin,
  blockUser,
  unblockUser,
} from "../../API/Admin/admin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function AdminUsersListComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers : any = await getAllUsersForAdmin();
        setUsers(allUsers.users);
      } catch (error) {
        toast.error("Failed to load users");
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId ) => {
    try {
      await blockUser(userId);
      toast.success("User blocked successfully");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: true } : user
        )
      );
    } catch (error) {
      toast.error("Failed to block user");
      console.error("Failed to block user", error);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await unblockUser(userId);
      toast.success("User unblocked successfully");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: false } : user
        )
      );
    } catch (error) {
      toast.error("Failed to unblock user");
      console.error("Failed to unblock user", error);
    }
  };

  const confirmBlockUnblock = (userId, isBlocked) => {
    Swal.fire({
      title: isBlocked ? "Unblock User?" : "Block User?",
      text: `Are you sure you want to ${
        isBlocked ? "unblock" : "block"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isBlocked ? "Yes, unblock" : "Yes, block",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isBlocked) {
          handleUnblockUser(userId);
        } else {
          handleBlockUser(userId);
        }
      }
    });
  };

  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar flex flex-col">
        <h1 className="text-center text-xl font-semibold mb-4">Users List</h1>
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">UserProfile</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Username</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Bio</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Private</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Suspended</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Google Login</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Blocked</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <td className="p-2 flex justify-center items-center border border-gray-300 dark:border-gray-600">
                    <img
                      src={user.dp}
                      alt={`${user.name}`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{user.name}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{user.email}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{user.username}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{user.bio || "N/A"}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{user.isPrivate ? "Yes" : "No"}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{user.isSuspended ? "Yes" : "No"}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{user.isGoogleSignedIn ? "Yes" : "No"}</td>
                  <td className="p-2  border border-gray-300 dark:border-gray-600">{user.isBlocked ? "Yes" : "No"}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600 justify-center items-center ">
                    <button
                      onClick={() =>
                        confirmBlockUnblock(user._id, user.isBlocked)
                      }
                      className={`px-4 py-2 rounded justify-center items-center  ${
                        user.isBlocked
                          ? "bg-green-500 hover:bg-green-700"
                          : "bg-red-500 hover:bg-red-700"
                      } text-white`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default AdminUsersListComponent;
