import inquirer from "inquirer";
import { server } from "@/services/Server";

export async function choosePublicChannel(): Promise<PUBLIC_CHANNEL["id"]> {
  try {
    console.log("Fetching public channels...");

    const channels = await server.fetchPublicChannels();

    process.stdin.pause();
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "channel",
        message: "Which channel do you want to join?",
        choices: channels.map(channel => {
          return {
            key: channel.id,
            name: channel.name,
          };
        }),
      },
    ]);
    process.stdin.resume();

    const { channel } = answer;

    const id = channels.find(c => c.name === channel)?.id;
    if (!id) throw new Error("Invalid channel id");

    return id;
  } catch (err) {
    throw err;
  }
}
