import { User } from "../../entities/user";
import { UserData } from "../../entities/user-data";

export interface SubscribeUser {
  subscribeUserOnNewsletterList(userData: UserData): Promise<void>;
}
