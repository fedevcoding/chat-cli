import inquirer from "inquirer";
import { server } from "@/services/Server";

export async function createPublicChannel(): Promise<string> {
  process.stdin.pause();
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "channelName",
      message: "How do you want to call it?",
    },
  ]);
  process.stdin.resume();

  const { channelName } = answer;

  const channelData = await server.createPublicChannel(channelName);

  return channelData.id;
}
