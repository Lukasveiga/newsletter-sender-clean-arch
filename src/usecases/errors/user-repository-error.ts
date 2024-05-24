import { UsecaseError } from "./usecase-error";

export class UserNotFound extends UsecaseError {
  constructor() {
    super("User not found");
    this.name = "UserNotFound";
  }
}
