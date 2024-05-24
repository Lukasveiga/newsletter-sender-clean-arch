import { EmailServiceError } from "../errors/email-service-error";
import { EmailOptions, EmailService } from "../../usecases/ports/email-service";
import * as nodemailer from "nodemailer";

export class NodemailerEmailService implements EmailService {
  async send(options: EmailOptions): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        auth: {
          user: options.user,
          pass: options.pass,
        },
      });

      transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      throw new EmailServiceError();
    }
  }
}
