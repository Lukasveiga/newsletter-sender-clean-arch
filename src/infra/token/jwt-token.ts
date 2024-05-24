import { Token, TokenOptions } from "../../usecases/ports/token";
import jwt from "jsonwebtoken";
import { InvalidTokenError } from "../errors/token-error";

export class JwtToken implements Token {
  generate(email: string, tokenOptions: TokenOptions): string {
    return jwt.sign(
      {
        email,
        iss: tokenOptions.iss,
        iat: tokenOptions.iat,
      },
      tokenOptions.secretKey,
      {
        expiresIn: tokenOptions.expiresIn,
        algorithm: tokenOptions.algorithm as jwt.Algorithm,
      }
    );
  }
  validate(token: string, secretKey: string): any {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new InvalidTokenError();
    }
  }
}
