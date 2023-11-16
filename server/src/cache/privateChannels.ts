export const privateChannels: PRIVATE_CHANNEL[] = [];

export const addPrivateChannel = (channel: PRIVATE_CHANNEL) => {
  privateChannels.push(channel);
};

export const removePrivateChannel = (channelId: string) => {
  const index = privateChannels.findIndex(channel => channel.id === channelId);
  privateChannels.splice(index, 1);
};

export const getPrivateChannels = () => {
  return privateChannels;
};

export const validPassword = (password: string, channelId: string): boolean => {
  const channel = privateChannels.find(channel => channel.id === channelId);
  if (!channel) return false;
  return channel.password === password;
};
