type CLIENT_MESSAGE = {
  type: "name" | "message";
  name: string | null;
  payload: string;
};
