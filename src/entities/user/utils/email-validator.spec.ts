import { InvalidEmailError } from "../errors/invalid-email";
import { EmailValidator } from "./email-validator";

jest.mock("validator", () => ({
  isEmail: jest.fn(),
}));

describe("EmailValidator", () => {
  test("Should throw if invalid email is provided", () => {
    const validator = require("validator");
    validator.isEmail.mockReturnValue(false);

    const email: string = "invalid_email@email.com";
    const error = () => {
      EmailValidator.validate(email);
    };

    expect(error).toThrow(new InvalidEmailError());
  });
});
