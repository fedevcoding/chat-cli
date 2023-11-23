import { parseBlob } from "@/utils";
import { SYSTEM_NAME } from "@/constants";

import { Server } from "socket.io";
import { validPassword } from "@/cache/privateChannels";
import { User } from "@/services/User";

export function handleSocketConnection(io: Server) {
  io.on("connection", socket => {
    const { channelId, type, password } = socket.handshake.query || {};

    if (!type) {
      socket.disconnect();
      return;
    }

    // if (type === "private") {
    //   if (typeof channelId !== "string" || typeof password !== "string") {
    //     socket.disconnect();
    //     return;
    //   }
    //   const valid = validPassword(channelId, password);
    //   if (!valid) {
    //     socket.disconnect();
    //     return;
    //   }
    // }

    const socketRoom = type === "public" ? (channelId as string) : "global";

    // if (type === "public") {
    //   socket.join(socketRoom);
    // } else {
    // }
    // to check for private channel (require password)

    socket.join(socketRoom);

    const SocketUser = new User();

    socket.on("message", blob => {
      const message: MESSAGE = parseBlob(blob);

      const { type, payload, fromSystem, name, referenceId } = message;

      if (type === "name") {
        if (!name || !referenceId) {
          socket.disconnect();
          return;
        }

        SocketUser.setUser(name, referenceId);

        const message: MESSAGE = {
          name: SYSTEM_NAME,
          payload: `Welcome, ${name}!`,
          type: "message",
          referenceId,
          fromSystem: true,
        };
        socket.emit("message", message);

        const message2: MESSAGE = {
          name: SYSTEM_NAME,
          payload: `${name} has joined the chat!`,
          type: "join",
          referenceId,
          fromSystem: true,
        };

        io.to(socketRoom).emit("message", message2);
      } else if (type === "message") {
        io.to(socketRoom).emit("message", message);
      }
    });

    socket.on("disconnect", () => {
      socket.leave(socketRoom);

      if (!SocketUser.isActivated) return;
      const message: MESSAGE = {
        name: SYSTEM_NAME,
        payload: `${SocketUser.name} has left the chat :/`,
        type: "leave",
        referenceId: SocketUser.id,
        fromSystem: true,
      };
      io.to(socketRoom).emit("message", message);
    });
  });
}
