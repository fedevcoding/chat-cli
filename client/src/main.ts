import { USER } from "./data/userInfo";
import { getAction } from "./utils/getAction";
import { joinGlobalChat } from "./channels/globalChat";
// import { SERVER_URL } from "./constants";
import { choosePublicChannel } from "./utils/getPublicChannels";

export async function main() {
  const action = await getAction();

  switch (action) {
    case "Join global chat":
      USER.setChannel({ type: "global" });
      joinGlobalChat();
      break;
    case "Join public chat":
      choosePublicChannel();
      // USER.setChannel({ type: "public" });
      break;
    // case "Join public chat":
    //   USER.setChannel({ type: "public" });
    //   break;

    // default :
  }
}
