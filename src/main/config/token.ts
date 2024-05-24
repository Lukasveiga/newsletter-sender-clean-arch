import { TokenOptions } from "../../usecases/ports/token";
import "dotenv/config";

export const getTokenOptions = (): TokenOptions => {
  const tokenOptions: TokenOptions = {
    secretKey: process.env.SECRET_KEY as string,
    expiresIn: "5d",
    algorithm: "HS256",
    iss: "news-letter-sender",
    iat: new Date().getTime() / 1000,
  };

  return tokenOptions;
};
