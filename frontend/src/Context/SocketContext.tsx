// import React, { createContext, useEffect, useState } from "react";
// import useUserDetails from "../Hooks/useUserDetails";
// import io from "socket.io-client";

// export const SocketContext = createContext();

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const currentUser = useUserDetails();
//   useEffect(() => {
//     if (currentUser) {
//       const socket = io("http://loacalhost:3000", {
//         query: {
//           userId: currentUser._id,
//         },
//       });

//       setSocket(socket);

//       //socket.on is used to listen to the events , can tbe used on both cliene and server side
//       socket.on("getOnlineUsers", users => {
//         setOnlineUsers(users);
//       });

//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();

//         setSocket(null);
//       }
//     }
//   }, []);
//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };



import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import useUserDetails from "../Hooks/useUserDetails";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

interface SocketContextProviderProps {
  children: ReactNode;
}

export const useSocketContext = () => {
  return useContext(SocketContext)
}


export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const currentUser = useUserDetails();

  useEffect(() => {
    if (currentUser) {
      const socketInstance = io("http://localhost:3000", {
        query: {
          userId: currentUser?._id,
        },
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.close();
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
