import { DomainError } from "./domain-error";

export class InvalidNameError extends Error implements DomainError {
  constructor() {
    super("User name is invalid");
    this.name = "InvalidNameError";
  }
}
