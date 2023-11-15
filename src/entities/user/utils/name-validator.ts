import { InvalidEmailError } from "./../errors/invalid-email";

export class NameValidation {
  static validate(name: string): void {
    if (!name || name.trim().length < 1 || name.trim().length > 155) {
      throw new InvalidEmailError();
    }
  }
}
