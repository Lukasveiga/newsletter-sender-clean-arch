import { TokenOptions } from "../ports/token";

export interface SendNewsletter {
  sendNewsletterToSubscribedUsers(path: string, host: string, port: string): Promise<void>;
}
