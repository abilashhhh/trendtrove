 
import React, { useState } from "react";
import SearchInput from "./Components/SearchInput";
import Conversations from "./Components/Conversations";

interface ChatLeftSidebarProps {
  setChatSelected: (value: boolean) => void;
}

const ChatLeftSidebar: React.FC<ChatLeftSidebarProps> = ({ setChatSelected }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-slate-300 rounded-lg dark:bg-slate-900 w-full sm:w-1/2 md:w-1/4 xl:w-1/5 p-1 h-full flex flex-col overflow-auto no-scrollbar">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex-1 ">
        <Conversations searchQuery={searchQuery} setChatSelected={setChatSelected} />
      </div>
    </div>
  );
};

export default ChatLeftSidebar;
