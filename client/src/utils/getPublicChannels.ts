import inquirer from "inquirer";
import { server } from "@/services/Server";

export async function choosePublicChannel(): Promise<string> {
  try {
    const channels = await server.fetchPublicChannels();

    process.stdin.pause();
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "channel",
        message: "Which channel do you want to join?",
        choices: channels.map((channel: any) => {
          return {
            key: channel.id,
            name: channel.name,
          };
        }),
      },
    ]);
    process.stdin.resume();

    const { channel } = answer;

    const id = channels.find((c: any) => c.name === channel).id;

    return id;
  } catch (err) {
    throw err;
  }
}
