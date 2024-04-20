import mongoose from "mongoose";
import dotenv  from "dotenv";

import {app} from "./app.js"

dotenv.config({ path: "../config.env" });

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception ...");
  console.log(err.name, err.message);
  process.exit(1);
});
// const URI= process.env.MONGODB_URL;
mongoose.connect("mongodb://127.0.0.1/HackUp", { useNewUrlParser: true })
  .then(() => console.log("DB connected Successfull...."));

const port = process.env.PORT;

const server = app.listen(port, () => {
  const date = new Date(); // Get the current date and time
  const jsonString = JSON.stringify(date);
  console.log(jsonString);

  console.log(`App running at port: ${port}....`);
});

import { Server } from 'socket.io';
const io =new Server (server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    // credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection...");
  console.log(err.name, err.message);
  //close the server
  server.close(() => {
    process.exit(1);
  });
});
