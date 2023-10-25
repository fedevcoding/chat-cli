require("module-alias/register");

import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

io.on("connection", socket => {
  console.log("Client connected");

  socket.emit("message", "Welcome to the chat!\nWhat's your name?");

  socket.on("message", message => {
    const json = JSON.parse(message.toString());
    console.log(json);
  });
});

io.listen(PORT);
console.log(`Listening on port ${PORT}`);
