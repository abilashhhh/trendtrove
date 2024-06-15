import React from "react";
import useConversation from "../../../Hooks/useConversations";

interface User {
  _id: string;
  username: string;
  name: string;
  dp: string;
}

interface ConversationItemProps {
  user: User;
  setChatSelected: (value: boolean) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  user,
  setChatSelected,
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  return (
    <div
      key={user._id}
      className={`flex items-center p-2 gap-2 hover:bg-slate-400 cursor-pointer dark:hover:bg-slate-700 bg-slate-200 dark:bg-slate-800 rounded-md ${
        isSelected ? "bg-sky-400" : ""
      }`}
      onClick={() => {
        setSelectedConversation(user);
        setChatSelected(true);
      }}>
      <div className="avatar online">
        <div className="w-10 rounded-full">
          <img
            src={user.dp}
            alt={user.username}
            className="w-10 h-10 rounded-full mr-2"
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-row items-center">
          <div className="font-bold text-sm">{user.username}</div>
        </div>
        <div className="text-sm text-gray-600">{user.name}</div>
      </div>
    </div>
  );
};

export default ConversationItem;
