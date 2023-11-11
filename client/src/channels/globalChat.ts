import io from "socket.io-client";
import { formatName, logger, removeLastLine } from "@/utils";
import { SERVER_URL, SYSTEM_NAME } from "@/constants";
import { USER } from "@/data/userInfo";

export const joinGlobalChat = () => {
  const socket = io(SERVER_URL);

  socket.on("connect", async () => {
    USER.setConnected(true);

    logger.info(`${SYSTEM_NAME}: `, "Connected to server");
    logger.info(`${SYSTEM_NAME}: `, "Welcome to the chat, What's your name?");
  });

  socket.on("message", async json => {
    const { id } = USER;

    if (!USER.name) return;
    const message: MESSAGE = json;

    // skip logging person joined if it's the current user
    if (message.referenceId === id && message.type === "join") return;

    // format the name of based on who sent the message
    const name = formatName(message.name, message.referenceId, USER.id, message.fromSystem);

    logger.info(`${name}: `, message.payload, "\r");

    // remove strange empty line forming with logger.info
    if (!message.fromSystem) {
      removeLastLine();
    }
  });

  process.stdin.on("data", input => {
    const { name, id, connected } = USER;

    if (!connected) return;

    const msgType = name ? "message" : "name";
    const message: MESSAGE = {
      name: USER.name,
      payload: input.toString(),
      referenceId: id,
      type: msgType,
      fromSystem: false,
    };
    if (!name) {
      const formattedName = input.toString().trim();
      USER.setName(formattedName);
      message["payload"] = formattedName;
    } else {
      // removed typed line to auto log it in a better styled way
      removeLastLine();
    }
    socket.send(JSON.stringify(message));
  });
};
