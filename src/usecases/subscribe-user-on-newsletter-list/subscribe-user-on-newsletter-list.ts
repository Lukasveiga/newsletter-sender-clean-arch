import { UserRepository } from "./../ports/user-repository";
import { UserData } from "../../entities/user/user-data";
import { SubscribeUser } from "./subscribe-user";

export class SubscribeUserOnNewsletterList implements SubscribeUser {
  constructor(private readonly userRepository: UserRepository) {}

  async subscribeUserOnNewsletterList(userData: UserData): Promise<void> {
    await this.userRepository.add(userData);
  }
}
