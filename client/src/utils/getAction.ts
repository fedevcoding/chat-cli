import { ACTIONS, ACTION_VALUES } from "@/data/userInfo";
import inquirer from "inquirer";

export async function getAction(): Promise<ACTION_VALUES> {
  process.stdin.pause();
  const answer: {
    action: ACTION_VALUES;
  } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: Object.values(ACTIONS),
      default: ACTIONS[0],
    },
  ]);
  process.stdin.resume();

  const { action } = answer;

  return action;
}
