"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = exports.getReceiverSocketId = void 0;
const userSocketMap = {};
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
const socket = (io) => {
    io.on("connection", (socket) => {
        console.log("New connection: ", socket.id);
        const userId = socket.handshake.query.userId;
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
            const receiverSocketId = (0, exports.getReceiverSocketId)(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", { senderId, message });
                io.to(receiverSocketId).emit("getNotification", { senderId, isRead: false, date: new Date() });
            }
        });
    });
};
exports.socket = socket;
