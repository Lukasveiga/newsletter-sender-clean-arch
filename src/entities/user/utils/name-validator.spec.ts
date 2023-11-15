import { InvalidNameError } from "../errors/invalid-name";
import { NameValidation } from "./name-validator";

describe("NameValidation", () => {
  test("Should throw if invalid name is provided", () => {
    const invalidNameCases: string[] = [
      "",
      "a",
      "dvuwqbzpmjvurdgmemadjraabawkwzmqahghtfchhijhqziq",
    ];
    for (const invalidNameCase of invalidNameCases) {
      const error = () => {
        NameValidation.validate(invalidNameCase);
      };
      expect(error).toThrow(new InvalidNameError());
    }
  });
});
