import express from "express";
import dotenv from "dotenv";
import connedToDb from "./db/Database_Connection.js";
import authRoutes from "./routes/auth.route.js";
import ticketRoute from "./routes/ticket.route.js";
import messageRoute from "./routes/message.route.js";
import aiRoutes from "./routes/ai.route.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import cors from "cors";
import path from 'path'

dotenv.config();
const NewPORT = process.env.PORT || 4000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve()

app.use("/api/auth", authRoutes);
app.use("/api/ticket", ticketRoute);
app.use("/api/message", messageRoute);
app.use("/api/ai-chat", aiRoutes);

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,"/frontend/dist")))
   app.get(/(.*)/,(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
  })
}

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

server.listen(NewPORT, () => {
  connedToDb();
  console.log(`Server running on port : ${NewPORT}`);
});
