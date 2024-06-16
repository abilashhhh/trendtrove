import { create } from "zustand";
import { Message } from "../Types/userProfile";

interface ConversationState {
  selectedConversation: string | null;
  setSelectedConversation: (selectedConversation: string | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
