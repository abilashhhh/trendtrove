import React, { createContext, useEffect, useState, ReactNode, useContext, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import useUserDetails from "../Hooks/useUserDetails";
import useConversation from "../Hooks/useConversations";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[];
  notifications: any[];
  markAllNotificationAsRead: (notifications: any[]) => void;
  markSpecificUserNotificationAsRead: (notifications: any[], userId : string) => void;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUsers: [],
  notifications: [],
  markAllNotificationAsRead: () => {},
  markSpecificUserNotificationAsRead: () => {},
});

interface SocketContextProviderProps {
  children: ReactNode;
}

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const currentUser = useUserDetails();
  const { selectedConversation } = useConversation();

  console.log("Notifications: ", notifications);

  useEffect(() => {
    if (currentUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: currentUser._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      socket.on("getNotification", (res) => {
        const isChatOpen = selectedConversation?._id === res.senderId;
        if (isChatOpen) {
          setNotifications(prev => [{ ...res, isRead: true }, ...prev]);
        } else {
          setNotifications(prev => [res, ...prev]);
        }
      });

      // Clean up function
      return () => {
        socket.disconnect();
      };

    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [currentUser, selectedConversation]);

  const markAllNotificationAsRead = useCallback((notifications: any[]) => {
    const mNotifications = notifications.map((n) => {
      return { ...n, isRead: true };
    });
    setNotifications(mNotifications);
  }, []);

  const markSpecificUserNotificationAsRead = useCallback((notifications: any[], userId: string) => {
    const mNotifications = notifications.map((n) => 
      n.senderId === userId ? { ...n, isRead: true } : n
    );
    setNotifications(mNotifications);
  }, []);
  


  return (
    <SocketContext.Provider value={{ socket, onlineUsers, notifications, markAllNotificationAsRead ,markSpecificUserNotificationAsRead }}>
      {children}
    </SocketContext.Provider>
  );
};
