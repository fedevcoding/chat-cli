import { parseBlob } from "@/utils";
import { SYSTEM_NAME } from "@/constants";

import { Server } from "socket.io";
import { addUserToPrivateChannel, removeUserFromPrivateChannel, validPassword } from "@/cache/privateChannels";
import { User } from "@/services/User";
import { addUserToPublicChannel, removeUserFromPublicChannel } from "@/cache/publicChannels";

export function handleSocketConnection(io: Server) {
  io.on("connection", socket => {
    const query: SocketQuery = (socket.handshake.query || {}) as SocketQuery;
    if (!query.type) {
      socket.emit("message", "connerr");
      socket.disconnect();
      return;
    }

    if (query.type === "private") {
      const valid = validPassword(query.channelId, query.password);
      if (!valid) {
        socket.emit("message", "wrongpassword");
        socket.disconnect();
        return;
      }
    }

    io.send("connected");

    const socketRoom = query.type === "public" ? query.channelId : "global";

    if (query.type !== "global") {
      if (query.type === "public") addUserToPublicChannel(query.channelId);
      if (query.type === "private") addUserToPrivateChannel(query.channelId);
    }

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

      if (query.type !== "global") {
        if (query.type === "public") removeUserFromPublicChannel(query.channelId);
        if (query.type === "private") removeUserFromPrivateChannel(query.channelId);
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
