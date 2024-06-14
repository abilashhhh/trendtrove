import React, { useEffect, useState } from "react";
import { getFriendsUserInfo } from "../../../API/Chat/chat";
import { getAllUsers } from "../../../API/User/user";

interface ConversationsProps {
  searchQuery: string;
}

const Conversations: React.FC<ConversationsProps> = ({ searchQuery }) => {
  const [mutualFriends, setMutualFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const mutualUsersInfo = async () => {
    try {
      const mutualFriendsResponse = await getFriendsUserInfo();
      if (mutualFriendsResponse && mutualFriendsResponse.data) {
        setMutualFriends(mutualFriendsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching mutual friends:", error);
    }
  };

  const allUsersInfo = async () => {
    try {
      const allUsersResponse = await getAllUsers();
      if (allUsersResponse && allUsersResponse.user) {
        setAllUsers(allUsersResponse.user);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    mutualUsersInfo();
    allUsersInfo();
  }, []);

  const combinedUsers = [
    ...mutualFriends,
    ...allUsers.filter(
      user => !mutualFriends.some(friend => friend._id === user._id)
    ),
  ];

  const filteredUsers = combinedUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-3 rounded-lg shadow-md flex-grow overflow-auto">
      <div className="space-y-3">
        {filteredUsers && filteredUsers.length > 0
          ? filteredUsers.map(user => (
              <div
                key={user._id}
                className="flex items-center p-2 hover:bg-slate-400 cursor-pointer dark:hover:bg-slate-700 bg-slate-200 dark:bg-slate-800 rounded-md">
                <img
                  src={user.dp}
                  alt={user.username}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div className="flex-1">
                  <div className="font-bold text-sm">{user.username}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
            ))
          : "No users "}
      </div>
    </div>
  );
};

export default Conversations;
