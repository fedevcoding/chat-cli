import { getRandomId } from "@/utils";

export const USER: USER_INFO = {
  id: getRandomId(),
  name: null,
  setName(name: string) {
    this.name = name;
  },
};
