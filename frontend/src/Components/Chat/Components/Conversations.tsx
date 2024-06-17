 
import React, { useEffect, useState } from "react";
import { getFriendsUserInfo } from "../../../API/Chat/chat";
import { getAllUsers } from "../../../API/User/user";
import ConversationItem from "./ConversationItem";

interface User {
  _id: string;
  username: string;
  name: string;
  dp: string;
}

interface ConversationsProps {
  searchQuery: string;
  setSelectedConversation: (user: User | null) => void;
}

const Conversations: React.FC<ConversationsProps> = ({ searchQuery, setSelectedConversation }) => {
  const [mutualFriends, setMutualFriends] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
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
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchMutualFriends();
    fetchAllUsers();
  }, []);

  const combinedUsers = [
    ...mutualFriends,
    ...allUsers.filter(user => !mutualFriends.some(friend => friend._id === user._id)),
  ];

  const filteredUsers = combinedUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  return (
    <div className="pt-1 rounded-lg shadow-md flex-grow overflow-auto">
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <ConversationItem
            key={user._id}
            user={user}
            setSelectedConversation={setSelectedConversation}
          />
        ))
      ) : (
        <div className="text-gray-600 dark:text-gray-400">No users found</div>
      )}
    </div>
  );
};

export default Conversations;
