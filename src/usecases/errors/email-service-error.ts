import { UsecaseError } from "./usecase-error";

export class EmailServiceError extends Error implements UsecaseError {
  constructor() {
    super("Email Service Error");
    this.name = "EmailServiceError";
  }
}
