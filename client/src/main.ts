import { USER } from "./data/userInfo";
import { getAction } from "./utils/getAction";
import { joinChat } from "./channels/chat";
import { choosePublicChannel } from "./utils/getPublicChannels";
import { createPublicChannel } from "./utils/createPublicChannel";

export async function main() {
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
    // case "Join public chat":
    //   USER.setChannel({ type: "public" });
    //   break;

    // default :
  }
}
