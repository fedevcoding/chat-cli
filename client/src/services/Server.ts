import { SERVER_ROUTES } from "@/constants";
import axios from "axios";

class Server {
  constructor() {}

  async fetchPublicChannels() {
    try {
      const data = await axios.get(SERVER_ROUTES.PUBLIC_CHANNELS);
      const channels = data.data;

      return channels;
    } catch (err) {
      throw err;
    }
  }
}

export const server = new Server();
