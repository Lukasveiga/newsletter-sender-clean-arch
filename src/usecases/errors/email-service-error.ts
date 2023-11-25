import { UsecaseError } from "./usecase-error";

export class EmailServiceError extends UsecaseError {
  constructor() {
    super("Email Service Error");
    this.name = "EmailServiceError";
  }
}
