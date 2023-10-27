require("module-alias/register");
import dotenv from "dotenv";
dotenv.config();
import io from "socket.io-client";
import { logger, removeLastLine } from "./utils";
import { SERVER_URL } from "./constants";
import { USER } from "./data/userInfo";

const socket = io(SERVER_URL);

socket.on("connect", () => {
  logger.info("System: ", "Connected to server");
  logger.info("System: ", "Welcome to the chat, What's your name?");
});

socket.on("message", json => {
  const { name, id } = USER;

  if (!name) return;
  const message: MESSAGE = json;

  const rightName = message.referenceId === id ? "You" : message.name;

  if (message.referenceId === id && message.type === "join") return;
  logger.info(`${rightName}: `, message.payload);
});

process.stdin.on("data", input => {
  const { name, id } = USER;
  const message: MESSAGE = {
    name: USER.name || "",
    payload: input.toString(),
    referenceId: id,
    type: USER.name ? "message" : "name",
  };

  if (!name) {
    USER.setName(input.toString().trim());
  } else {
    removeLastLine();
  }
  socket.send(JSON.stringify(message));
});
