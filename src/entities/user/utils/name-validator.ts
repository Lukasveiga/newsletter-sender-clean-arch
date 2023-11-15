import { InvalidNameError } from "../errors/invalid-name";

export class NameValidation {
  static validate(name: string): void {
    if (!name || name.trim().length < 2 || name.trim().length > 45) {
      throw new InvalidNameError();
    }
  }
}
