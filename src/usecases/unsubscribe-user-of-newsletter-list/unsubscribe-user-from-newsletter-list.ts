import { UserRepository } from "./../ports/user-repository";
import { UnsubscribeUser } from "./unsubscribe-user";

export class UnsubscribeUserFromNewsletterList implements UnsubscribeUser {
  constructor(private readonly UserRepository: UserRepository) {}

  async unsubscribeUserFromNewsletterList(email: string): Promise<void> {
    await this.UserRepository.updateActiveStatus(email);
  }
}
