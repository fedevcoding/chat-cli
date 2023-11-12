import { USER } from "./data/userInfo";
import { getAction } from "./utils/getAction";
import { joinGlobalChat } from "./channels/globalChat";
import { SERVER_URL } from "./constants";

export async function main() {
  const action = await getAction();

  switch (action) {
    case "Join global chat":
      USER.setChannel({ type: "global" });
      joinGlobalChat();
      break;
    case "Join public chat":
      const data = await fetch(SERVER_URL + "/publicChannels");
      const channels = await data.json();
      console.log(channels);
      // USER.setChannel({ type: "public" });
      break;
    // case "Join public chat":
    //   USER.setChannel({ type: "public" });
    //   break;

    // default :
  }
}
