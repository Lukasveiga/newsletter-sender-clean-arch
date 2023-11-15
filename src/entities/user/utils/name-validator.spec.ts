import { InvalidNameError } from "../errors/invalid-name";
import { NameValidation } from "./name-validator";

describe("NameValidation", () => {
  test("Should throw if invalid name is provided", () => {
    const emptyName: string = "";
    const shortName: string = "a";
    let longName: string = "";

    for (let i = 0; i <= 45; i++) {
      longName += "a";
    }

    const invalidNameCases: string[] = [emptyName, shortName, longName];
    for (const invalidNameCase of invalidNameCases) {
      const error = () => {
        NameValidation.validate(invalidNameCase);
      };
      expect(error).toThrow(new InvalidNameError());
    }
  });
});
