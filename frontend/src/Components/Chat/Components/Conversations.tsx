import React, { useEffect, useState } from "react";
import { getFriendsUserInfo } from "../../../API/Chat/chat";
import { getAllUsers } from "../../../API/User/user";
import useConversation from "../../../Hooks/useConversations";

interface ConversationsProps {
  searchQuery: string;
  setChatSelected: (value: boolean) => void;
}

const Conversations: React.FC<ConversationsProps> = ({ searchQuery, setChatSelected }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = (userId: string) => selectedConversation?._id === userId;

  const [mutualFriends, setMutualFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const fetchMutualFriends = async () => {
    try {
      const response = await getFriendsUserInfo();
      if (response && response.data) {
        setMutualFriends(response.data);
      }
    } catch (error) {
      console.error("Error fetching mutual friends:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response && response.user) {
        setAllUsers(response.user);
        console.log("All users:", response.user);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchMutualFriends();
    fetchAllUsers();
  }, []);

  const combinedUsers = [
    ...mutualFriends,
    ...allUsers.filter((user) => !mutualFriends.some((friend) => friend._id === user._id)),
  ];

  const filteredUsers = combinedUsers.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-3 rounded-lg shadow-md flex-grow overflow-auto">
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user._id}
            className={`flex items-center p-2 gap-2 hover:bg-slate-400 cursor-pointer dark:hover:bg-slate-700 bg-slate-200 dark:bg-slate-800 rounded-md ${
              isSelected(user._id) ? "bg-sky-400" : ""
            }`}
            onClick={() => {
              setSelectedConversation(user);
              setChatSelected(true);
            }}
          >
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img src={user.dp} alt={user.username} className="w-10 h-10 rounded-full mr-2" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-row items-center">
                <div className="font-bold text-sm">{user.username}</div>
              </div>
              <div className="text-sm text-gray-600">{user.name}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-600 dark:text-gray-400">No users found</div>
      )}
    </div>
  );
};

export default Conversations;
