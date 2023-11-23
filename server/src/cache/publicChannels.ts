export const publicChannels: PUBLIC_CHANNEL[] = [];

export const addPublicChannel = (channel: PUBLIC_CHANNEL) => {
  if (publicChannels.find(c => c.name === channel.name)) throw new Error("Channel name already exists");
  publicChannels.push(channel);
};

export const removePublicChannel = (channelId: string) => {
  const index = publicChannels.findIndex(channel => channel.id === channelId);
  publicChannels.splice(index, 1);
};

export const getPublicChannels = () => {
  return publicChannels;
};
