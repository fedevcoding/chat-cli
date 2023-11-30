function isPrivateChannel(pet: CHANNEL<any>): pet is CHANNEL<CHANNEL_TYPES.PRIVATE> {
  return (pet as CHANNEL<CHANNEL_TYPES.PRIVATE>).password !== undefined;
}

class Channel<T extends CHANNEL_TYPES> {
  public type: CHANNEL_TYPES;
  public name: string;
  public id: string;
  public users: number;
  public password?: string;

  constructor(channelData: CHANNEL<T>) {
    this.type = channelData.type;
    this.id = channelData.id;
    this.name = channelData.name;
    this.users = 1;

    if (isPrivateChannel(channelData)) {
      this.password = channelData.password;
    }
  }
}

class Channels {
  public CHANNELS: Channel<any>[] = [];

  constructor() {}

  addChannel<T extends CHANNEL_TYPES>(channel: Channel<T>): void {
    this.CHANNELS.push(channel);
  }

  removeChannel(id: string): void {
    this.CHANNELS = this.CHANNELS.filter(arr => {
      arr.id != id;
    });
  }

  getChannels<T extends CHANNEL_TYPES>(type: T): Channel<T>[] {
    return this.CHANNELS.filter(arr => arr.type === type);
  }

  addUserToChannel(id: string): void {
    const channel = this.CHANNELS.find(arr => arr.id === id);
    if (!channel) throw new Error("Channel not found");
    channel.users++;
  }

  removeUserFromChannel(id: string) {
    const channel = this.CHANNELS.find(arr => arr.id === id);
    if (!channel) throw new Error("Channel not found");
    channel.users--;
    if (channel.users === 0) this.removeChannel(id);
  }

  validPassword(id: string, password: string): boolean {
    const channel = this.CHANNELS.find(arr => arr.id === id);
    if (!channel) throw new Error("Channel not found");

    if (!isPrivateChannel(channel)) throw new Error("Channel is not private");

    return channel.password === password;
  }
}

export const CHANNELS = new Channels();
