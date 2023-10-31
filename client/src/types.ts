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
};
