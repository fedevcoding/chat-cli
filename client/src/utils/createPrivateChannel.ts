import inquirer from "inquirer";
import { server } from "@/services/Server";

export async function createPrivateChannel(): Promise<{
  id: string;
  password: string;
}> {
  try {
    process.stdin.pause();
    const nameAswer = await inquirer.prompt([
      {
        type: "input",
        name: "channelName",
        message: "How do you want to call it?",
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

    const { channelName } = nameAswer;
    const { password } = passwordAnswer;

    const channelData = await server.createPrivateChannel(channelName, password);

    return {
      id: channelData.id,
      password: channelData.password,
    };
  } catch (err) {
    throw err;
  }
}
