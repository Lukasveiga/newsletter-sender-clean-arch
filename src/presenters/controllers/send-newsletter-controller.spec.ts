import { InMemoryUserRepository } from "./../../usecases/in-memory-user-repository/in-memory-user-repository";
import { SendNewsletterController } from "./send-newsletter-controller";
import { SendNewsletterToSubscribedUsers } from "../../usecases/send-newsletter-to-subscribed-users/send-newsletter-to-subscribed-users";
import { User } from "../../entities/user/user";
import { EmailOptions, EmailService } from "../../usecases/ports/email-service";
import { Context, HtmlCompiler } from "../../usecases/ports/html-compiler";

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

class EmailServiceSpy implements EmailService {
  static sendFuctionWasCalled = false;
  async send(options: EmailOptions): Promise<void> {
    EmailServiceSpy.sendFuctionWasCalled = true;
  }
}

class HtmlCompilerSpy implements HtmlCompiler {
  async compile(path: string, context: Context): Promise<string> {
    return "";
  }
}

const makeSut = () => {
  const userList: User[] = [];
  const inMemoryUserRepository = new InMemoryUserRepository(userList);
  const emailServiceSpy = new EmailServiceSpy();
  const htmlCompilerSpy = new HtmlCompilerSpy();
  const sendNewsletterToSubscribedUsers = new SendNewsletterToSubscribedUsers(
    inMemoryUserRepository,
    emailServiceSpy,
    emailOptions,
    htmlCompilerSpy
  );
  const sut = new SendNewsletterController(sendNewsletterToSubscribedUsers);

  return { sut, sendNewsletterToSubscribedUsers };
};

describe("SendNewsletterController", () => {
  test("Should retruns status code 200 when the newsletter is sent successfully", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.send();
    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse.body).toEqual("Newsletters sent successfully");
  });

  test("Should retruns status code 500 when sendNewsletterToSubscribedUsers throws unexpected error", async () => {
    const { sut, sendNewsletterToSubscribedUsers } = makeSut();

    jest
      .spyOn(sendNewsletterToSubscribedUsers, "sendNewsletterToSubscribedUsers")
      .mockImplementation(() => {
        throw new Error();
      });

    const httpResponse = await sut.send();
    expect(httpResponse.statusCode).toEqual(500);
    expect(httpResponse.body.message).toEqual("Internal Server Error");
  });
});
