import React, { useState } from "react";
import SearchInput from "./Components/SearchInput";
import Conversations from "./Components/Conversations";
import useConversation from "../../Hooks/useConversations";

const ChatLeftSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedConversation } = useConversation();

  return (
    <div className="bg-slate-100 rounded-lg dark:bg-slate-900 w-full  p-2 h-full flex flex-col overflow-auto no-scrollbar">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex-1">
        <Conversations searchQuery={searchQuery} setSelectedConversation={setSelectedConversation} />
      </div>
    </div>
  );
};

export default ChatLeftSidebar;
