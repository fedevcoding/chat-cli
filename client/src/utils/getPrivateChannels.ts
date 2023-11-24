import inquirer from "inquirer";
import { server } from "@/services/Server";

export async function choosePrivateChannel(): Promise<{ id: string; password: string }> {
  try {
    console.log("Fetching private channels...");

    const channels = await server.fetchPrivateChannels();

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

    const passwordAnswer = await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message: "What's the password?",
      },
    ]);

    process.stdin.resume();

    const { channel } = answer;
    const { password } = passwordAnswer;

    const id = channels.find(c => c.name === channel)?.id;
    if (!id) throw new Error("Invalid channel id");

    return { id, password };
  } catch (err) {
    throw err;
  }
}
