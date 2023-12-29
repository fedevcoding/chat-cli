import { USER } from "@/data/userInfo";
import { getAction } from "@/utils/getAction";
import { joinChat } from "@/channels/chat";
import { choosePublicChannel } from "@/utils/getPublicChannels";
import { createPublicChannel } from "@/utils/createPublicChannel";
import { AxiosError } from "axios";
import { createPrivateChannel } from "@/utils/createPrivateChannel";
import { choosePrivateChannel } from "@/utils/getPrivateChannels";
import { wait } from "@/utils";
import { WAIT_BEFORE_EXIT } from "@/constants";
import { CHANNEL_TYPES } from "@/types";

export async function main() {
  try {
    const action = await getAction();

    switch (action) {
      case "Join global chat":
        USER.setChannel({ type: CHANNEL_TYPES.GLOBAL });
        joinChat();
        break;
      case "Join public chat": {
        const chatId = await choosePublicChannel();
        USER.setChannel({ type: CHANNEL_TYPES.PUBLIC, channelId: chatId });
        joinChat();

        break;
      }
      case "Create public chat": {
        const channelId = await createPublicChannel();
        USER.setChannel({ type: CHANNEL_TYPES.PUBLIC, channelId });
        joinChat();

        break;
      }

      case "Crate private chat": {
        const { id, password } = await createPrivateChannel();
        USER.setChannel({
          type: CHANNEL_TYPES.PRIVATE,
          channelId: id,
          password,
        });
        joinChat();
        break;
      }

      case "Join private chat": {
        const data = await choosePrivateChannel();
        USER.setChannel({
          type: CHANNEL_TYPES.PRIVATE,
          channelId: data.id,
          password: data.password,
        });
        joinChat();
        break;
      }

      default:
        console.log("Invalid action");
        break;
    }
  } catch (e) {
    if (
      e instanceof AxiosError &&
      e.response?.headers["content-type"] === "application/json"
    ) {
      console.log(e.response?.data);
      await wait(WAIT_BEFORE_EXIT);
      process.exit(1);
    }
    console.log("Something went wrong, try again later.");
    await wait(WAIT_BEFORE_EXIT);
    process.exit(1);
  }
}
