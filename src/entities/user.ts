import { UserData } from "./user-data";

export class User {
  public readonly name: string;
  public readonly email: string;

  private constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  static create(userData: UserData): User {
    return new User(userData.name, userData.email);
  }
}
