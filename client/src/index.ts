require("module-alias/register");

import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

import io from "socket.io-client";
import { removeLastLine } from "./utils";

const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
});

let name: string | null = null;

const init = () => {
  const message: CLIENT_MESSAGE = {
    payload: "Welcome to the chat!\nWhat's your name?",
    name: "System",
    type: "message",
  };

  console.log(`System: ${message.payload}`);
};
init();

socket.on("message", json => {
  if (!name) return;
  const message: CLIENT_MESSAGE = json;

  const rightName = message.name ? (message.name === name ? "You" : message.name) : "";

  if (message.name === name && message.type === "join") return;
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
