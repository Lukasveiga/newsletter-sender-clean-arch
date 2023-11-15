import isEmail from "validator/lib/isEmail";
import { InvalidEmailError } from "../errors/invalid-email";

export class EmailValidator {
  static validate(email: string): void {
    if (!isEmail(email)) {
      throw new InvalidEmailError();
    }
  }
}
