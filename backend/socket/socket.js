import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://mern-customer-support-app.onrender.com"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  
  socket.on("joinTicket", (ticketId) => {
    socket.join(ticketId);
    console.log(`Socket ${socket.id} joined ticket ${ticketId}`);
  });

  socket.on("leaveTicket", (ticketId) => {
    socket.leave(ticketId);
    console.log(`Socket ${socket.id} left ticket ${ticketId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });



});

export { app, io, server };
