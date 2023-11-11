import { USER } from "./data/userInfo";
import { getAction } from "./utils/getAction";
import { joinGlobalChat } from "./channels/globalChat";

export async function main() {
  const action = await getAction();

  switch (action) {
    case "Join global chat":
      USER.setChannel({ type: "global" });
      joinGlobalChat();
      break;
    case "Create public chat":
      // USER.setChannel({ type: "public" });
      break;
    // case "Join public chat":
    //   USER.setChannel({ type: "public" });
    //   break;

    // default :
  }
}
