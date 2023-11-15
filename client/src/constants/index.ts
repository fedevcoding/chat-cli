export const PORT = 3000;
export const WS_SERVER_URL = `ws://localhost:${PORT}`;
export const SERVER_URL = `http://localhost:${PORT}`;

export const SYSTEM_NAME = "System";

export const SERVER_ROUTES = {
  PUBLIC_CHANNELS: `${SERVER_URL}/publicChannels`,
} as const;
