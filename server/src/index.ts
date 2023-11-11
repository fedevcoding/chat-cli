require("module-alias/register");

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";

import { Server } from "socket.io";
import { useRoutes } from "@/routes/useRoutes";
import { handleSocketConnection } from "@/socket/handleConnection";
import { PORT } from "@/constants";

const app = express();
const server = http.createServer(app);
useRoutes(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

handleSocketConnection(io);

server.listen(PORT);
console.log(`Listening on port ${PORT}`);
