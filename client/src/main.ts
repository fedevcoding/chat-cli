import { USER } from "./data/userInfo";
import { getAction } from "./utils/getAction";
import { joinChat } from "./channels/chat";
import { choosePublicChannel } from "./utils/getPublicChannels";
import { createPublicChannel } from "./utils/createPublicChannel";
import { AxiosError } from "axios";
import { createPrivateChannel } from "./utils/createPrivateChannel";
import { choosePrivateChannel } from "./utils/getPrivateChannels";

export async function main() {
  try {
    const action = await getAction();

    switch (action) {
      case "Join global chat":
        USER.setChannel({ type: "global" });
        joinChat();
        break;
      case "Join public chat":
        const chatId = await choosePublicChannel();
        USER.setChannel({ type: "public", channelId: chatId });
        joinChat();

        break;
      case "Create public chat":
        const channelId = await createPublicChannel();
        USER.setChannel({ type: "public", channelId });
        joinChat();

        break;

      case "Crate private chat":
        const { id, password } = await createPrivateChannel();
        USER.setChannel({ type: "private", channelId: id, password });
        joinChat();
        break;

      case "Join private chat":
        const data = await choosePrivateChannel();
        USER.setChannel({ type: "private", channelId: data.id, password: data.password });
        joinChat();
        break;

      default:
        console.log("Invalid action");
        break;
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response?.data);
      return;
    }
    console.log("Something went wrong, try again later.");
    return;
  }
}
