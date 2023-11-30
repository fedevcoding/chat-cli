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

type CHANNEL<T extends CHANNEL_TYPES> = T extends CHANNEL_TYPES.PRIVATE
  ? {
      type: T;
      name: string;
      id: string;
      password: string;
    }
  : {
      type: T;
      name: string;
      id: string;
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
