require("module-alias/register");

import dotenv from "dotenv";

dotenv.config();

import io from "socket.io-client";
import { removeLastLine } from "./utils";

const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
});

let name: string | null = null;

socket.on("message", json => {
  const message: CLIENT_MESSAGE = json;

  const rightName = message.name ? (message.name === name ? "You" : message.name) : "";
  console.log(`${rightName}: ${message.payload}`);
});

process.stdin.on("data", input => {
  const message: CLIENT_MESSAGE = {
    name: name || "",
    payload: input.toString(),
    type: name ? "message" : "name",
  };

  if (!name) {
    name = input.toString().trim();
  } else {
    removeLastLine();
  }
  socket.send(JSON.stringify(message));
});
