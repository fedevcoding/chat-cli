import { parseBlob } from "@/utils";
import { SYSTEM_NAME } from "@/constants";

import { Server } from "socket.io";
import { validPassword } from "@/cache/privateChannels";

export function handleSocketConnection(io: Server) {
  io.on("connection", socket => {
    const { channelId, type, password } = socket.handshake.query || {};

    if (!type) {
      socket.disconnect();
      return;
    }

    if (type === "private") {
      if (typeof channelId !== "string" || typeof password !== "string") {
        socket.disconnect();
        return;
      }
      const valid = validPassword(channelId, password);
      if (!valid) {
        socket.disconnect();
        return;
      }
    }

    console.log(channelId, type, password);

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
}
