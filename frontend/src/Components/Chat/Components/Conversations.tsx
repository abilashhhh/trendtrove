import React, { useState, useEffect } from "react";
import ConversationItem from "../Components/ConversationItem";
 
import useGetConversations from "../../../Hooks/useGetConversations";

interface User {
  _id: string;
  username: string;
  name: string;
  dp: string;
}

const Conversations: React.FC = () => {
  const [chatSelected, setChatSelected] = useState(false);
  const { conversationsData, searchQuery } = useGetConversations();

  useEffect(() => {
    console.log("conversations:", conversationsData);
    console.log("searchQuery:", searchQuery);
  }, [conversationsData, searchQuery]);

  if (!conversationsData || !searchQuery) {
    return <div>Loading...</div>;
  }

  const filteredConversations = conversationsData.filter((user: User) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-grow p-4 h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        conversationsData
      </h2>
      {filteredConversations.map((user: User) => (
        <ConversationItem key={user._id} user={user} setChatSelected={setChatSelected} />
      ))}
    </div>
  );
};

export default Conversations;

// import React, { useEffect, useState } from "react";
// import { getFriendsUserInfo } from "../../../API/Chat/chat";
// import { getAllUsers } from "../../../API/User/user";
// import ConversationItem from "./ConversationItem";

// interface ConversationsProps {
//   searchQuery: string;
//   setChatSelected: (value: boolean) => void;
// }

// const Conversations: React.FC<ConversationsProps> = ({
//   searchQuery,
//   setChatSelected,
// }) => {
//   const [mutualFriends, setMutualFriends] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);

//   const fetchMutualFriends = async () => {
//     try {
//       const response = await getFriendsUserInfo();
//       if (response && response.data) {
//         setMutualFriends(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching mutual friends:", error);
//     }
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const response = await getAllUsers();
//       if (response && response.user) {
//         setAllUsers(response.user);
//         console.log("All users:", response.user);
//       }
//     } catch (error) {
//       console.error("Error fetching all users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMutualFriends();
//     fetchAllUsers();
//   }, []);

//   const combinedUsers = [
//     ...mutualFriends,
//     ...allUsers.filter(
//       user => !mutualFriends.some(friend => friend._id === user._id)
//     ),
//   ];

//   const filteredUsers = combinedUsers.filter(user =>
//     user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="pt-3 rounded-lg shadow-md flex-grow overflow-auto">
//       {filteredUsers.length > 0 ? (
//         filteredUsers.map(user => (
//           <ConversationItem
//             key={user._id}
//             user={user}
//             setChatSelected={setChatSelected}
//           />
//         ))
//       ) : (
//         <div className="text-gray-600 dark:text-gray-400">No users found</div>
//       )}
//     </div>
//   );
// };

// export default Conversations;
