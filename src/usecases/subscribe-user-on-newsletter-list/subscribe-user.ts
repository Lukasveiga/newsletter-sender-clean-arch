import { UserData } from "../../entities/user/user-data";

export interface SubscribeUser {
  subscribeUserOnNewsletterList(userData: UserData): Promise<void>;
}
