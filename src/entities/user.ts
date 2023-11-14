import { UserData } from "./user-data";

export class User {
  public readonly name: string;
  public readonly email: string;
  private active: boolean;

  private constructor(name: string, email: string, active: boolean) {
    this.name = name;
    this.email = email;
    this.active = active;
  }

  static create(userData: UserData): User {
    return new User(userData.name, userData.email, true);
  }

  public unsubscribe(): void {
    this.active = false;
  }

  public isSubscribed(): boolean {
    return this.active;
  }
}
