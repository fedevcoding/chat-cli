export const privateChannels: CHANNEL<CHANNEL_TYPES.PRIVATE>[] = [];

export const addPrivateChannel = (channel: CHANNEL<CHANNEL_TYPES.PRIVATE>) => {
  if (privateChannels.find(c => c.name === channel.name)) throw new Error("Channel name already exists");
  privateChannels.push(channel);
};

export const removePrivateChannel = (channelId: string) => {
  const index = privateChannels.findIndex(channel => channel.id === channelId);
  privateChannels.splice(index, 1);
};

export const getPivateChannels = () => {
  return privateChannels;
};

export const addUserToPrivateChannel = (channelId: string) => {
  const channel = privateChannels.find(channel => channel.id === channelId);
  if (!channel) throw new Error("Channel not found");
  channel.users++;
};

export const removeUserFromPrivateChannel = (channelId: string) => {
  const channel = privateChannels.find(channel => channel.id === channelId);
  if (!channel) throw new Error("Channel not found");
  channel.users--;

  if (channel.users === 0) removePrivateChannel(channelId);
};

export const validPassword = (channelId: string, password: string): boolean => {
  const channel = privateChannels.find(channel => channel.id === channelId);
  if (!channel) return false;

  return channel.password === password;
};
