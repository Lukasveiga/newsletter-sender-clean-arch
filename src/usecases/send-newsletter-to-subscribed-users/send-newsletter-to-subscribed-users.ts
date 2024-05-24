import { User } from "../../entities/user/user";
import { EmailOptions, EmailService } from "../ports/email-service";
import { Context, HtmlCompiler } from "../ports/html-compiler";
import { UserRepository } from "../ports/user-repository";
import { SendNewsletter } from "./send-newsletter";
import { Token, TokenOptions } from "../ports/token";

// TODO - Handle with errors than can be thrown by dependencies

export class SendNewsletterToSubscribedUsers implements SendNewsletter {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly emailOptions: EmailOptions,
    private readonly htmlCompiler: HtmlCompiler,
    private readonly token: Token,
    private readonly tokenOptions: TokenOptions
  ) {}

  async sendNewsletterToSubscribedUsers(path: string, host: string, port: string): Promise<void> {
    const activeUsers: User[] = await this.userRepository.findAllActiveUsers();

    if (activeUsers.length < 1) {
      return;
    }

    for (let activeUser of activeUsers) {
      const token = this.token.generate(activeUser.email, this.tokenOptions);

      const contextOptions: Context = {
        username: activeUser.name,
        host,
        port,
        token,
      };

      const htmlString = await this.htmlCompiler.compileHtml(path, contextOptions);

      const options = {
        host: this.emailOptions.host,
        port: this.emailOptions.port,
        user: this.emailOptions.user,
        pass: this.emailOptions.pass,
        from: "Lukas Veiga - Backend Dev. <lukas.veiga@backend.dev.com>",
        to: `${activeUser.name} <${activeUser.email}>`,
        subject: this.emailOptions.subject,
        html: htmlString,
      };

      this.emailService.send(options);
    }
  }
}
