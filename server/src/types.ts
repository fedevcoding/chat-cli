export const enum CHANNEL_TYPES {
  GLOBAL = "global",
  PRIVATE = "private",
  PUBLIC = "public",
}

export type MESSAGE = {
  type: "name" | "message" | "join" | "leave";
  name: string | null;
  referenceId: string;
  payload: string;
  fromSystem: boolean;
};

export type CHANNEL<T extends CHANNEL_TYPES> = T extends CHANNEL_TYPES.PRIVATE
  ? {
      type: T;
      name: string;
      password: string;
    }
  : {
      type: T;
      name: string;
    };

export type SocketQuery =
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
