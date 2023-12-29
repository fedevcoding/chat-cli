import { CHANNEL, CHANNEL_TYPES } from "@/types";
import { getRandomId } from "@/utils";

function isPrivateChannel(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channel: CHANNEL<any>
): channel is CHANNEL<CHANNEL_TYPES.PRIVATE> {
  return (channel as CHANNEL<CHANNEL_TYPES.PRIVATE>).password !== undefined;
}

export class Channel<T extends CHANNEL_TYPES> {
  public type: CHANNEL_TYPES;
  public name: string;
  public id: string;
  public users: number;
  public password?: string;

  constructor(channelData: CHANNEL<T>) {
    this.type = channelData.type;
    this.id = getRandomId();
    this.name = channelData.name;
    this.users = 0;

    if (isPrivateChannel(channelData)) {
      this.password = channelData.password;
    }
  }
}

class Channels {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public CHANNELS: Channel<any>[] = [];

  constructor() {}

  addChannel<T extends CHANNEL_TYPES>(channel: Channel<T>): void {
    this.CHANNELS.push(channel);
  }

  removeChannel(id: string): void {
    this.CHANNELS = this.CHANNELS.filter((arr) => {
      arr.id != id;
    });
  }

  getChannels<T extends CHANNEL_TYPES>(type: T): Channel<T>[] {
    return this.CHANNELS.filter((arr) => arr.type === type);
  }

  addUserToChannel(id: string): void {
    const channel = this.CHANNELS.find((arr) => arr.id === id);
    if (!channel) throw new Error("Channel not found");
    channel.users++;
  }

  removeUserFromChannel(id: string) {
    const channel = this.CHANNELS.find((arr) => arr.id === id);
    if (!channel) throw new Error("Channel not found");
    channel.users--;
    if (channel.users === 0) this.removeChannel(id);
  }

  validPassword(id: string, password: string): boolean {
    const channel = this.CHANNELS.find((arr) => arr.id === id);
    if (!channel) throw new Error("Channel not found");

    if (!isPrivateChannel(channel)) throw new Error("Channel is not private");

    return channel.password === password;
  }
}

export const CHANNELS = new Channels();
