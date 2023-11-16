import { UserRepository } from "./../ports/user-repository";
import { UnsubscribeUser } from "./unsubscribe-user";

export class UnsubscribeUserFromNewsletterList implements UnsubscribeUser {
  constructor(private readonly userRepository: UserRepository) {}

  async unsubscribeUserFromNewsletterList(email: string): Promise<void> {
    await this.userRepository.updateActiveStatus(email);
  }
}
