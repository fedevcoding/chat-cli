type MESSAGE = {
  type: "name" | "message" | "join" | "leave";
  name: string | null;
  referenceId: string;
  payload: string;
};

type USER_INFO = {
  id: string;
  name: string | null;
  setName: (name: string) => void;
};
