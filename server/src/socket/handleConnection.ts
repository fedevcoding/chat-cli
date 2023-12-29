import { parseBlob } from "@/utils";
import { SYSTEM_NAME } from "@/constants";

import { Server } from "socket.io";
import { User } from "@/services/User";
import { CHANNELS } from "@/services/Channels";

export function handleSocketConnection(io: Server) {
  io.on("connection", (socket) => {
    const query: SocketQuery = (socket.handshake.query || {}) as SocketQuery;
    if (!query.type) {
      socket.emit("message", "connerr");
      return;
    }

    if (query.type === "private") {
      const valid = CHANNELS.validPassword(query.channelId, query.password);
      if (!valid) {
        socket.emit("message", "wrongpassword");
        return;
      }
    }

    socket.send("connected");

    const socketRoom =
      query.type === "public" || query.type === "private"
        ? query.channelId
        : "global";

    if (query.type !== "global") {
      CHANNELS.addUserToChannel(query.channelId);
    }

    socket.join(socketRoom);

    const SocketUser = new User();

    socket.on("message", (blob) => {
      const message: MESSAGE = parseBlob(blob);

      const { type, name, referenceId } = message;

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
        io.to(socketRoom).emit("message", message);

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

      if (query.type !== "global") {
        CHANNELS.removeUserFromChannel(query.channelId);
      }

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
