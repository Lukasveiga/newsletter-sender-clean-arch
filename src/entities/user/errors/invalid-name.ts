import { DomainError } from "./domain-error";

export class InvalidNameError extends DomainError {
  constructor() {
    super("User name is invalid");
    this.name = "InvalidNameError";
  }
}
