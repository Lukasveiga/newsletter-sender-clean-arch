import { UserNotFound } from "../errors/user-repository-error";
import { UserRepository } from "./../ports/user-repository";
import { UnsubscribeUser } from "./unsubscribe-user";

export class UnsubscribeUserFromNewsletterList implements UnsubscribeUser {
  constructor(private readonly userRepository: UserRepository) {}

  async unsubscribeUserFromNewsletterList(email: string): Promise<void> {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (!existingUser) {
      throw new UserNotFound();
    }

    await this.userRepository.updateActiveStatus(email);
  }
}
