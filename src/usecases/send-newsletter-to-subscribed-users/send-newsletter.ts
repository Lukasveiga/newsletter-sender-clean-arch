import { Context } from "../ports/html-compiler";

export interface SendNewsletter {
  sendNewsletterToSubscribedUsers(path: string, context: Context): Promise<void>;
}
