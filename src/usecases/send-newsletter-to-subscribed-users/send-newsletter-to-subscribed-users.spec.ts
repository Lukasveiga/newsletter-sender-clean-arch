import { InMemoryUserRepository } from "./../in-memory-user-repository/in-memory-user-repository";
import { EmailOptions, EmailService } from "../ports/email-service";
import { Context, HtmlCompiler } from "../ports/html-compiler";
import { UserRepository } from "../ports/user-repository";
import { User } from "../../entities/user/user";
import { SendNewsletterToSubscribedUsers } from "./send-newsletter-to-subscribed-users";
import { UserData } from "../../entities/user/user-data";
import { Token, TokenOptions } from "../ports/token";

const emailOptions: EmailOptions = {
  host: "host_test",
  port: 123,
  user: "user_test",
  pass: "pass_test",
  from: "from_test@email.com",
  to: "to_test@email.com",
  subject: "subject_test",
  html: "html_test",
};

const tokenOptions: TokenOptions = {
  secretKey: "123",
  expiresIn: "1",
  algorithm: "HS256",
  iss: "api",
  iat: 5,
};

class EmailServiceSpy implements EmailService {
  static sendFuctionWasCalled = false;
  async send(options: EmailOptions): Promise<void> {
    EmailServiceSpy.sendFuctionWasCalled = true;
  }
}

class HtmlCompilerSpy implements HtmlCompiler {
  async compileHtml(path: string, context: Context): Promise<string> {
    return "";
  }
}

class TokenSpy implements Token {
  generate(email: string, tokenOptions: TokenOptions): string {
    return "";
  }
  validate(token: string, secretKey: string) {
    return "";
  }
}

const makeSut = (userList: User[]) => {
  const inMemoryUserRpository: UserRepository = new InMemoryUserRepository(userList);
  const emailService = new EmailServiceSpy();
  const htmlCompiler = new HtmlCompilerSpy();
  const token = new TokenSpy();
  const sut = new SendNewsletterToSubscribedUsers(
    inMemoryUserRpository,
    emailService,
    emailOptions,
    htmlCompiler,
    token,
    tokenOptions
  );
  return { sut, emailService, emailOptions, htmlCompiler, token, tokenOptions };
};

describe("SendNewsletterToSubscribedUsers", () => {
  const path = "test_path";
  const host = "localhost";
  const port = "3030";
  const userData: UserData = { name: "name_test", email: "email_test@email.com" };
  test("Should not send email with newsletter if there are no subscribed users", async () => {
    const userList: User[] = [];

    const { sut } = makeSut(userList);
    await sut.sendNewsletterToSubscribedUsers(path, host, port);

    expect(EmailServiceSpy.sendFuctionWasCalled).toBeFalsy();
  });

  test("Should send email with newsletter", async () => {
    const userList: User[] = [User.create(userData)];
    const path: string = "test_path";

    const { sut } = makeSut(userList);
    await sut.sendNewsletterToSubscribedUsers(path, host, port);

    expect(EmailServiceSpy.sendFuctionWasCalled).toBeTruthy();
  });

  test("Should call token generate function with correct parameters", async () => {
    const userList: User[] = [User.create(userData)];
    const path: string = "test_path";

    const { sut, token, tokenOptions } = makeSut(userList);

    const tokenSpy = jest.spyOn(token, "generate");

    await sut.sendNewsletterToSubscribedUsers(path, host, port);

    expect(tokenSpy).toHaveBeenCalledWith(userData.email, tokenOptions);
  });

  test("Should call htmlCompiler compileHtml function with correct parameters", async () => {
    const userList: User[] = [User.create(userData)];
    const path: string = "test_path";

    const { sut, htmlCompiler } = makeSut(userList);

    const htmlCompilerSpy = jest.spyOn(htmlCompiler, "compileHtml");

    await sut.sendNewsletterToSubscribedUsers(path, host, port);

    expect(htmlCompilerSpy).toHaveBeenCalledWith(path, {
      username: userData.name,
      host,
      port,
      token: "",
    });
  });

  test("Should call emailService send function with correct parameters", async () => {
    const userList: User[] = [User.create(userData)];
    const path: string = "test_path";

    const { sut, emailService, emailOptions } = makeSut(userList);

    const emailServiceSpy = jest.spyOn(emailService, "send");

    await sut.sendNewsletterToSubscribedUsers(path, host, port);

    expect(emailServiceSpy).toHaveBeenCalledWith({
      host: emailOptions.host,
      port: emailOptions.port,
      user: emailOptions.user,
      pass: emailOptions.pass,
      from: "Lukas Veiga - Backend Dev. <lukas.veiga@backend.dev.com>",
      to: `${userData.name} <${userData.email}>`,
      subject: emailOptions.subject,
      html: "",
    });
  });
});
