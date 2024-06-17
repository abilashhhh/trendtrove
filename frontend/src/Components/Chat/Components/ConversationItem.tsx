// import React from "react";
// import useConversation from "../../../Hooks/useConversations";
// import { useSocketContext } from "../../../Context/SocketContext";

// interface User {
//   _id: string;
//   username: string;
//   name: string;
//   dp: string;
// }

// interface ConversationItemProps {
//   user: User;
//   setChatSelected: (value: boolean) => void;
// }

// const ConversationItem: React.FC<ConversationItemProps> = ({
//   user,
//   setChatSelected,
// }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const isSelected = selectedConversation?._id === user._id;

//   console.log("selectedConversation:", selectedConversation);


//   const {onlineUsers}  = useSocketContext()
//   const isOnline = onlineUsers.includes(user._id)

//   return (
//     <div
//       key={user._id}
//       className={`flex items-center p-2 gap-2 hover:bg-slate-400 cursor-pointer dark:hover:bg-slate-700 bg-slate-200 dark:bg-slate-800 mt-2 rounded-md ${
//         isSelected ? "bg-slate-400 text-black dark:text-white dark:bg-slate-900 border" : ""
//       }`}
//       onClick={() => {
//         setSelectedConversation(user);
//         setChatSelected(true);
//       }}
//     >
//       <div className={`avatar ${isOnline ? "online" : ""}`}>
//         <div className="w-10 rounded-full">
//           <img
//             src={user.dp}
//             alt={user.username}
//             className="w-10 h-10 rounded-full mr-2"
//           />
//         </div>
//       </div>
//       <div className="flex-1">
//         <div className="flex flex-row items-center">
//           <div className={`font-bold text-sm ${isSelected ? "text-black dark:text-white" : "text-gray-900 dark:text-gray-300"}`}>
//             {user.username}
//           </div>
//         </div>
//         <div className={`text-sm ${isSelected ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
//           {user.name}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationItem;

import React from "react";
import useConversation from "../../../Hooks/useConversations";
import { useSocketContext } from "../../../Context/SocketContext";

interface User {
  _id: string;
  username: string;
  name: string;
  dp: string;
}

interface ConversationItemProps {
  user: User;
  setSelectedConversation: (user: User) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ user, setSelectedConversation }) => {
  const { selectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      key={user._id}
      className={`flex items-center p-2 gap-2 hover:bg-slate-400 cursor-pointer dark:hover:bg-slate-700 bg-slate-200 dark:bg-slate-800 mt-2 rounded-md ${
        isSelected ? "bg-slate-400 text-black dark:text-white dark:bg-slate-900 border" : ""
      }`}
      onClick={() => {
        setSelectedConversation(user);
      }}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-10 rounded-full">
          <img src={user.dp} alt={user.username} className="w-10 h-10 rounded-full mr-2" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-row items-center">
          <div className={`font-bold text-sm ${isSelected ? "text-black dark:text-white" : "text-gray-900 dark:text-gray-300"}`}>
            {user.username}
          </div>
        </div>
        <div className={`text-sm ${isSelected ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
          {user.name}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
