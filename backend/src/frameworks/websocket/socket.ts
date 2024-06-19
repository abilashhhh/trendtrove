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
    console.log("New connection: ", socket.id);

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

    socket.on("sendMessage", data => {
      const { senderId, receiverId, message } = data;
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", { senderId, message });
        io.to(receiverSocketId).emit("getNotification", { senderId,isRead:false,date: new Date() });
      }
    });
  });
};
export { socket };
