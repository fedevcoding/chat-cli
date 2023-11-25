import io from "socket.io-client";
import { formatName, logger, removeLastLine } from "@/utils";
import { WS_SERVER_URL, SYSTEM_NAME } from "@/constants";
import { USER } from "@/data/userInfo";
import { main } from "@/main";

export const joinChat = () => {
  if (!USER.channel) {
    throw new Error("No channel selected");
  }

  const query: SocketQuery = USER.channel;

  const socket = io(WS_SERVER_URL, {
    query: { ...query },
  });

  socket.on("message", async (message: SOCKET_MESSAGE) => {
    if (message === "connected") {
      USER.setConnected(true);

      logger.info(`${SYSTEM_NAME}: `, "Connected to server");
      logger.info(`${SYSTEM_NAME}: `, "Welcome to the chat, What's your name?");

      return;
    }

    if (message === "wrongpassword") {
      logger.info(`${SYSTEM_NAME}: `, "Wrong password.\n");
      socket.disconnect();
      main();
      return;
    }

    if (message === "connerr") {
      logger.info(`${SYSTEM_NAME}: `, "Something went wrong while connecting.\n");
      socket.disconnect();
      main();
      return;
    }

    const { id } = USER;

    if (!USER.name) return;

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

    if (!name) {
      const formattedName = input.toString().trim();
      USER.setName(formattedName);
    } else {
      // removed typed line to auto log it in a better styled way
      removeLastLine();
    }

    const message: MESSAGE = {
      name: USER.name,
      payload: input.toString(),
      referenceId: id,
      type: msgType,
      fromSystem: false,
    };

    socket.send(JSON.stringify(message));
  });
};
