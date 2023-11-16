export interface EmailOptions {
  readonly host: string;
  readonly port: string;
  readonly user: string;
  readonly pass: string;
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly html: string;
}

export interface EmailService {
  send(options: EmailOptions): Promise<void>;
}
