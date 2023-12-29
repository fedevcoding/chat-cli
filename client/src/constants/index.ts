import { getEnvs } from "@/utils/getEnv";

export const PORT = 3000;
export const WS_SERVER_URL = getEnvs(
  "WS_SERVER_URL",
  "wss://chatcli-server.fedev.me",
);
export const SERVER_URL = getEnvs(
  "SERVER_URL",
  "https://chatcli-server.fedev.me",
);

export const SYSTEM_NAME = "System";

export const WAIT_BEFORE_EXIT = 1000 * 60 * 60; // 1 hour

export const SERVER_ROUTES = {
  PUBLIC_CHANNELS: `${SERVER_URL}/publicChannels`,
  PRIVATE_CHANNELS: `${SERVER_URL}/privateChannels`,
} as const;
