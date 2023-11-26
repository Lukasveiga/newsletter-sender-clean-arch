import { EmailServiceError } from "./../errors/email-service-error";
import { User } from "../../entities/user/user";
import { EmailOptions, EmailService } from "../ports/email-service";
import { Context, HtmlCompiler } from "../ports/html-compiler";
import { UserRepository } from "../ports/user-repository";
import { SendNewsletter } from "./send-newsletter";

export class SendNewsletterToSubscribedUsers implements SendNewsletter {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly emailOptions: EmailOptions,
    private readonly htmlCompiler: HtmlCompiler
  ) {}

  async sendNewsletterToSubscribedUsers(path: string): Promise<void> {
    const activeUsers: User[] = await this.userRepository.findAllActiveUsers();

    if (activeUsers.length < 1) {
      return;
    }

    for (let activeUser of activeUsers) {
      const contextOptions: Context = {
        username: activeUser.name,
      };

      const htmlString = await this.htmlCompiler.compile(path, contextOptions);

      const options = {
        host: this.emailOptions.host,
        port: this.emailOptions.port,
        user: this.emailOptions.user,
        pass: this.emailOptions.pass,
        from: this.emailOptions.from,
        to: `${activeUser.name} <${activeUser.email}>`,
        subject: this.emailOptions.subject,
        html: htmlString,
      };

      try {
        this.emailService.send(options);
      } catch (error) {
        throw new EmailServiceError();
      }
    }
  }
}
