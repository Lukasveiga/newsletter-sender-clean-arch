import { EmailValidator } from "./utils/email-validator";
import { NameValidation } from "./utils/name-validator";
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
    NameValidation.validate(userData.name);
    EmailValidator.validate(userData.email);
    return new User(userData.name, userData.email, true);
  }

  public unsubscribe(): void {
    this.active = false;
  }

  public resubscribe(): void {
    this.active = true;
  }

  public isSubscribed(): boolean {
    return this.active;
  }
}
