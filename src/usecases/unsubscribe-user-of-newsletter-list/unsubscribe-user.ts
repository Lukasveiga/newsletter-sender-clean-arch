export interface UnsubscribeUser {
  unsubscribeUserFromNewsletterList(token: string, secretKey: string): Promise<void>;
}
