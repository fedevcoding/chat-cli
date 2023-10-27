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
  socket.on("message", blob => {
    const json: MESSAGE = parseBlob(blob);

    if (json.type === "name") {
      const message: MESSAGE = {
        payload: `Welcome, ${json.payload.trim()}!`,
        name: "System",
        type: "message",
        referenceId: json.referenceId,
      };
      socket.emit("message", message);

      io.emit("message", {
        payload: `${json.payload.trim()} has joined the chat!`,
        referenceId: json.referenceId,
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
