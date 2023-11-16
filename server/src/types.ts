type MESSAGE = {
  type: "name" | "message" | "join" | "leave";
  name: string | null;
  referenceId: string;
  payload: string;
  fromSystem: boolean;
};

type PUBLIC_CHANNEL = {
  type: "public";
  name: string;
  id: string;
  users: number;
};

type PRIVATE_CHANNEL = {
  type: "private";
  name: string;
  id: string;
  password: string;
  users: number;
};
