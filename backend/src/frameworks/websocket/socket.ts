    // import { Server, Socket } from "socket.io";
    // import { DefaultEventsMap } from "socket.io/dist/typed-events";

    // const socket = (io: Server<DefaultEventsMap>) => {
    // io.on("connection", socket => {
    //     console.log("Connected to socket.io", socket.id);

    //     const userSocketMap = {}; // {key :userId , value: socketId

    //     const userId = socket.handshake.query.userId;
    //     if (userId !== "undefined") {
    //     userSocketMap[userId] = socket.id;
    //     }

    //     // io.emit is used to send events to all the connected clients
    //     io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //     socket.on("disconnect", () => {
    //     console.log("User disconnected from socket.io", socket.id);
    //     delete userSocketMap[userId];
    //     io.emit("getOnlineUsers", Object.keys(userSocketMap));
    //     });
    // });
    // };

    // export default socket;

import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface UserSocketMap {
  [key: string]: string;
}

const userSocketMap: UserSocketMap = {};

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

const socket = (io: Server<DefaultEventsMap>) => {
  io.on("connection", (socket: Socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      if (userId !== "undefined") {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    

  });
};

export { socket };
