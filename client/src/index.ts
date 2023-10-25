require("module-alias/register");

import dotenv from "dotenv";

dotenv.config();

import io from "socket.io-client";

const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
});

let name: string | undefined = undefined;

socket.on("message", data => {
  console.log(data.toString());
});

process.stdin.on("data", input => {
  socket.send(input.toString());
});
