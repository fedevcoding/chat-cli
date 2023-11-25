import { getEnvs } from "@/utils/getEnv";

export const PORT = 3000;
export const WS_SERVER_URL = getEnvs("WS_SERVER_URL");
export const SERVER_URL = getEnvs("SERVER_URL");

export const SYSTEM_NAME = "System";

export const SERVER_ROUTES = {
  PUBLIC_CHANNELS: `${SERVER_URL}/publicChannels`,
  PRIVATE_CHANNELS: `${SERVER_URL}/privateChannels`,
} as const;
