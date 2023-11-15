import validator from "validator";
import { InvalidEmailError } from "../errors/invalid-email";

export class EmailValidator {
  static validate(email: string): void {
    if (!validator.isEmail(email)) {
      throw new InvalidEmailError();
    }
  }
}
