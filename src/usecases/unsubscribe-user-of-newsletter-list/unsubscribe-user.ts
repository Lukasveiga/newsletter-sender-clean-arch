export interface UnsubscribeUser {
  unsubscribeUserFromNewsletterList(email: string): Promise<void>;
}
