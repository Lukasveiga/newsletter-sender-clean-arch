import { InfraError } from "./infra-error";

export class EmailServiceError extends InfraError {
  constructor() {
    super("Email Service Error");
    this.name = "EmailServiceError";
  }
}
