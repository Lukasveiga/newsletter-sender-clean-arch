import { InMemoryUserRepository } from "./../../usecases/in-memory-user-repository/in-memory-user-repository";
import { SendNewsletterController } from "./send-newsletter-controller";
import { SendNewsletterToSubscribedUsers } from "../../usecases/send-newsletter-to-subscribed-users/send-newsletter-to-subscribed-users";
import { User } from "../../entities/user/user";
import { EmailOptions, EmailService } from "../../usecases/ports/email-service";
import { Context, HtmlCompiler } from "../../usecases/ports/html-compiler";
import { Token, TokenOptions } from "../../usecases/ports/token";

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

const makeSut = () => {
  const userList: User[] = [];
  const inMemoryUserRepository = new InMemoryUserRepository(userList);
  const emailServiceSpy = new EmailServiceSpy();
  const htmlCompilerSpy = new HtmlCompilerSpy();
  const tokenSpy = new TokenSpy();
  const sendNewsletterToSubscribedUsers = new SendNewsletterToSubscribedUsers(
    inMemoryUserRepository,
    emailServiceSpy,
    emailOptions,
    htmlCompilerSpy,
    tokenSpy,
    tokenOptions
  );
  const sut = new SendNewsletterController(sendNewsletterToSubscribedUsers);

  return { sut, sendNewsletterToSubscribedUsers };
};

describe("SendNewsletterController", () => {
  test("Should retruns status code 200 when the newsletter is sent successfully", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      host: "localhost",
      port: "3030",
    };

    const httpResponse = await sut.send(httpRequest);
    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse.body.message).toEqual("Newsletters sent successfully");
  });

  test("Should retruns status code 500 when sendNewsletterToSubscribedUsers throws unexpected error", async () => {
    const { sut, sendNewsletterToSubscribedUsers } = makeSut();

    const httpRequest = {
      host: "localhost",
      port: "3030",
    };

    jest
      .spyOn(sendNewsletterToSubscribedUsers, "sendNewsletterToSubscribedUsers")
      .mockImplementation(() => {
        throw new Error();
      });

    const httpResponse = await sut.send(httpRequest);
    expect(httpResponse.statusCode).toEqual(500);
    expect(httpResponse.body.message).toEqual("Internal Server Error");
  });
});
