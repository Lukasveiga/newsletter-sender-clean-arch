import { DomainError } from "./domain-error";

export class InvalidEmailError extends Error implements DomainError {
  constructor() {
    super("User email is invalid");
    this.name = "InvalidEmailError";
  }
}
