require("module-alias/register");

import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import { parseBlob } from "./utils";

const io = new Server({
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

io.on("connection", socket => {
  const message: CLIENT_MESSAGE = {
    payload: "Welcome to the chat!\nWhat's your name?",
    name: "System",
    type: "message",
  };
  socket.emit("message", message);

  socket.on("message", blob => {
    const json: CLIENT_MESSAGE = parseBlob(blob);

    if (json.type === "name") {
      const message: CLIENT_MESSAGE = {
        payload: `Welcome, ${json.payload.trim()}!`,
        name: "System",
        type: "message",
      };
      socket.emit("message", message);

      io.emit("message", {
        payload: `${json.payload.trim()} has joined the chat!`,
        name: "System",
        type: "join",
      });
    } else if (json.type === "message") {
      io.emit("message", json);
    }
  });
});

io.listen(PORT);
console.log(`Listening on port ${PORT}`);
