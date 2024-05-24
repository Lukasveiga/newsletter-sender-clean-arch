import { TokenOptions } from "../../usecases/ports/token";
import { Algorithm } from "jsonwebtoken";
import { JwtToken } from "./jwt-token";
import { InvalidTokenError } from "../errors/token-error";

const jwt = require("jsonwebtoken");

const sut = new JwtToken();

const tokenOptions: TokenOptions = {
  iss: "iss",
  iat: 1,
  secretKey: "secret",
  expiresIn: "1d",
  algorithm: "HS256",
};

describe("JwtToken", () => {
  test("call generate function with correct params", () => {
    const email = "email@example.com";

    const jwtSignSpy = jest.spyOn(jwt, "sign");

    sut.generate(email, tokenOptions);

    expect(jwtSignSpy).toHaveBeenCalledWith(
      {
        email,
        iss: tokenOptions.iss,
        iat: tokenOptions.iat,
      },
      tokenOptions.secretKey,
      {
        expiresIn: tokenOptions.expiresIn,
        algorithm: tokenOptions.algorithm as Algorithm,
      }
    );
  });

  test("call validate function with correct params", () => {
    const secret = "secret";
    const token = "token";

    const jwtVerifySpy = jest.spyOn(jwt, "verify");

    jwtVerifySpy.mockReturnValue("");

    sut.validate(token, secret);

    expect(jwtVerifySpy).toHaveBeenCalledWith(token, secret);
  });

  test("throw invalid token error when verifys fails", () => {
    const secret = "secret";
    const token = "token";

    const jwtVerifySpy = jest.spyOn(jwt, "verify");

    jwtVerifySpy.mockImplementation(() => {
      throw new Error();
    });

    try {
      sut.validate(token, secret);
    } catch (error) {
      expect(error).toEqual(new InvalidTokenError());
    }
  });
});
