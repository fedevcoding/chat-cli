import { SERVER_ROUTES } from "@/constants";
import { CHANNEL } from "@/types";
import axios from "axios";

class Server {
  constructor() {}

  async fetchPublicChannels(): Promise<CHANNEL[]> {
    const data = await axios.get<CHANNEL[]>(SERVER_ROUTES.PUBLIC_CHANNELS);
    const channels = data.data;

    return channels;
  }

  async fetchPrivateChannels(): Promise<CHANNEL[]> {
    const data = await axios.get<CHANNEL[]>(SERVER_ROUTES.PRIVATE_CHANNELS);
    const channels = data.data;

    return channels;
  }

  async createPublicChannel(channelName: string) {
    const data = await axios.post(SERVER_ROUTES.PUBLIC_CHANNELS, {
      name: channelName,
    });
    const channel = data.data;

    return channel;
  }

  async createPrivateChannel(channelName: string, password: string) {
    const data = await axios.post(SERVER_ROUTES.PRIVATE_CHANNELS, {
      name: channelName,
      password,
    });
    const channel = data.data;

    return channel;
  }
}

export const server = new Server();
