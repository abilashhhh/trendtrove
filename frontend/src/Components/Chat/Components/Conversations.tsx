import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../API/User/user";
import ConversationItem from "./ConversationItem";
import { getAllConversations } from "../../../API/Chat/chat";

interface User {
  _id: string;
  username: string;
  name: string;
  dp: string;
}

interface ConversationsProps {
  searchQuery: string;
  setSelectedConversation: (user: User | null) => void;
  activeTab: string; 
}

const Conversations: React.FC<ConversationsProps> = ({
  searchQuery,
  setSelectedConversation,
  activeTab,
}) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [usersWithConversations, setUsersWithConversations] = useState<string[]>([]);

  useEffect(() => {
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

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchUsersWithConversations = async () => {
      try {
        const response = await getAllConversations();
        if (response.data) {
          // Extract user IDs from conversations
          const participantIds = new Set<string>();
          response.data.forEach(conversation => {
            conversation.participants.forEach(participant => participantIds.add(participant));
          });
          setUsersWithConversations(Array.from(participantIds));
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchUsersWithConversations();
  }, []);

  console.log("usersWithConversations:", usersWithConversations);

  const filteredUsers = allUsers
    .filter(user => {
      if (activeTab === "chats") {
        return usersWithConversations.includes(user._id);
      } else if (activeTab === "newChat") {
        return !usersWithConversations.includes(user._id);
      }
      return true;
    })
    .filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="pt-1 rounded-lg shadow-md flex-grow overflow-auto no-scrollbar">
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
