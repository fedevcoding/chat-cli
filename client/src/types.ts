type CLIENT_MESSAGE = {
  type: "name" | "message" | "join" | "leave";
  name: string | null;
  payload: string;
};
