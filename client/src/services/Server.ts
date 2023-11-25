import { SERVER_ROUTES } from "@/constants";
import axios from "axios";

class Server {
  constructor() {}

  async fetchPublicChannels(): Promise<CHANNEL[]> {
    try {
      const data = await axios.get<CHANNEL[]>(SERVER_ROUTES.PUBLIC_CHANNELS);
      const channels = data.data;

      return channels;
    } catch (err) {
      throw err;
    }
  }

  async fetchPrivateChannels(): Promise<CHANNEL[]> {
    try {
      const data = await axios.get<CHANNEL[]>(SERVER_ROUTES.PRIVATE_CHANNELS);
      const channels = data.data;

      return channels;
    } catch (err) {
      throw err;
    }
  }

  async createPublicChannel(channelName: string) {
    try {
      const data = await axios.post(SERVER_ROUTES.PUBLIC_CHANNELS, {
        name: channelName,
      });
      const channel = data.data;

      return channel;
    } catch (err) {
      throw err;
    }
  }

  async createPrivateChannel(channelName: string, password: string) {
    try {
      const data = await axios.post(SERVER_ROUTES.PRIVATE_CHANNELS, {
        name: channelName,
        password,
      });
      const channel = data.data;

      return channel;
    } catch (err) {
      throw err;
    }
  }
}

export const server = new Server();
