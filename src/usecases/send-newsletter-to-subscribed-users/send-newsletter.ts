export interface SendNewsletter {
  sendNewsletterToSubscribedUsers(path: string): Promise<void>;
}
