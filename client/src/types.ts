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

type ObjectValues<T> = T[keyof T];

// type PUBLIC_CHANNEL = {
//   type: "public";
//   name: string;
//   id: string;
//   users: number;
// };
