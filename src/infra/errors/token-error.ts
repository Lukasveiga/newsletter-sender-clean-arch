import { InfraError } from "./infra-error";

export class InvalidTokenError extends InfraError {
  constructor() {
    super("Invalid Token Error");
    this.name = "TokenError";
  }
}
