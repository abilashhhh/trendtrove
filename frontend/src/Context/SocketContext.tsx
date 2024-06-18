
import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import io, { Socket } from "socket.io-client";
import useUserDetails from "../Hooks/useUserDetails";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<SocketContextProps>({ socket: null, onlineUsers: [] });

interface SocketContextProviderProps {
  children: ReactNode;
}

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const currentUser = useUserDetails();

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

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
