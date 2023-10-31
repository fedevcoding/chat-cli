import { getRandomId } from "@/utils";

export const USER: USER_INFO = {
  id: getRandomId(),
  name: null,
  setName(name: string) {
    this.name = name;
  },
  connected: false,
  setConnected(connected: boolean) {
    this.connected = connected;
  },
};

export const ACTIONS = {
  0: "Join global chat",
  1: "Join public chat",
  2: "Join private chat",
  3: "Create public chat",
  4: "Crate private chat",
};
