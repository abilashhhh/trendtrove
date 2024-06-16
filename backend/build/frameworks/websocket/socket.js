"use strict";
// import { Server, Socket } from "socket.io";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";
Object.defineProperty(exports, "__esModule", { value: true });
const socket = (io) => {
    const userSocketMap = {};
    io.on("connection", (socket) => {
        console.log("Connected to socket.io", socket.id);
        const userId = socket.handshake.query.userId;
        if (userId !== "undefined") {
            userSocketMap[userId] = socket.id;
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        socket.on("disconnect", () => {
            console.log("User disconnected from socket.io", socket.id);
            if (userId !== "undefined") {
                delete userSocketMap[userId];
            }
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};
exports.default = socket;
