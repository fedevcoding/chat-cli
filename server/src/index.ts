require("module-alias/register");

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";

import { Server } from "socket.io";
import { parseBlob } from "./utils";
import { SYSTEM_NAME } from "./constants";

const app = express();

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

io.on("connection", socket => {
  let name = "";
  let id = "";

  socket.on("message", blob => {
    const json: MESSAGE = parseBlob(blob);

    if (json.type === "name") {
      name = json.payload;
      id = json.referenceId;
      const message: MESSAGE = {
        name: SYSTEM_NAME,
        payload: `Welcome, ${json.payload}!`,
        type: "message",
        referenceId: json.referenceId,
        fromSystem: true,
      };
      socket.emit("message", message);

      const message2: MESSAGE = {
        name: SYSTEM_NAME,
        payload: `${json.payload} has joined the chat!`,
        type: "join",
        referenceId: json.referenceId,
        fromSystem: true,
      };

      io.emit("message", message2);
    } else if (json.type === "message") {
      io.emit("message", json);
    }
  });

  socket.on("disconnect", () => {
    const message: MESSAGE = {
      name: SYSTEM_NAME,
      payload: `${name} has left the chat :/`,
      type: "leave",
      referenceId: id,
      fromSystem: true,
    };
    io.emit("message", message);
    // console.log("disconnecty");
  });
});

server.listen(PORT);
console.log(`Listening on port ${PORT}`);
