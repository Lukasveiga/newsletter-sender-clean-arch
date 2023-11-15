import { UsecaseError } from "./usecase-error";
export class UserNotFound extends Error implements UsecaseError {
  constructor() {
    super("User not found");
    this.name = "UserNotFound";
  }
}
