import { getRandomId } from "@/utils";
import { CHANNEL_TYPE, USER_INFO, ObjectValues } from "@/types";

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
  channel: null,
  setChannel(channel: CHANNEL_TYPE) {
    this.channel = channel;
  },
};

export const ACTIONS = {
  0: "Join global chat",
  1: "Join public chat",
  2: "Join private chat",
  3: "Create public chat",
  4: "Crate private chat",
} as const;

export type ACTION_VALUES = ObjectValues<typeof ACTIONS>;
