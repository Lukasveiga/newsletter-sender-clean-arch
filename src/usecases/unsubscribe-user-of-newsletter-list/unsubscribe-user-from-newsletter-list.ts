import { UserNotFound } from "../errors/user-repository-error";
import { Token } from "../ports/token";
import { UserRepository } from "./../ports/user-repository";
import { UnsubscribeUser } from "./unsubscribe-user";

export class UnsubscribeUserFromNewsletterList implements UnsubscribeUser {
  constructor(private readonly userRepository: UserRepository, private readonly token: Token) {}

  async unsubscribeUserFromNewsletterList(token: string, secretKey: string): Promise<void> {
    let email;

    const payload = this.token.validate(token, secretKey);
    email = payload.email;

    const existingUser = await this.userRepository.findUserByEmail(email);

    if (!existingUser) {
      throw new UserNotFound();
    }

    await this.userRepository.updateActiveStatus(email);
  }
}
