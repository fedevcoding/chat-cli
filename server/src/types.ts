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
  users: string[];
};
