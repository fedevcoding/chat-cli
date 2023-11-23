export class User {
  name: string = "";
  id: string = "";
  isActivated: boolean = false;

  constructor() {}

  setUser(name: string, id: string) {
    this.name = name;
    this.id = id;

    this.isActivated = true;
  }
}
