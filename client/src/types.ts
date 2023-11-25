const enum CHANNEL_TYPES {
  GLOBAL = "global",
  PRIVATE = "private",
  PUBLIC = "public",
}

type MESSAGE = {
  type: "name" | "message" | "join" | "leave";
  name: string | null;
  referenceId: string;
  payload: string;
  fromSystem: boolean;
};

type USER_INFO = {
  id: string;
  name: string | null;
  setName: (name: string) => void;
  connected: boolean;
  setConnected: (connected: boolean) => void;
  channel: CHANNEL_TYPE | null;
  setChannel: (channel: CHANNEL_TYPE) => void;
};

type CHANNEL_TYPE =
  | {
      type: CHANNEL_TYPES.GLOBAL;
    }
  | {
      type: CHANNEL_TYPES.PUBLIC;
      channelId: string;
    }
  | {
      type: CHANNEL_TYPES.PRIVATE;
      channelId: string;
      password: string;
    };

type SocketQuery =
  | {
      type: "global";
    }
  | {
      type: "public";
      channelId: string;
    }
  | {
      type: "private";
      channelId: string;
      password: string;
    };

type CHANNEL = {
  type: CHANNEL_TYPES;
  name: string;
  id: string;
  users: number;
};

type SOCKET_MESSAGE = "connected" | "wrongpassword" | "connerr" | MESSAGE;

// utils
type ObjectValues<T> = T[keyof T];
