import { InMemoryUserRepository } from "./../in-memory-user-repository/in-memory-user-repository";
import { EmailOptions, EmailService } from "../ports/email-service";
import { Context, HtmlCompiler } from "../ports/html-compiler";
import { UserRepository } from "../ports/user-repository";
import { User } from "../../entities/user/user";
import { SendNewsletterToSubscribedUsers } from "./send-newsletter-to-subscribed-users";
import { UserData } from "../../entities/user/user-data";
import { EmailServiceError } from "../errors/email-service-error";

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

const makeSut = (userList: User[]) => {
  const inMemoryUserRpository: UserRepository = new InMemoryUserRepository(userList);
  const emailServiceSpy = new EmailServiceSpy();
  const htmlCompilerSpy = new HtmlCompilerSpy();
  const sut = new SendNewsletterToSubscribedUsers(
    inMemoryUserRpository,
    emailServiceSpy,
    emailOptions,
    htmlCompilerSpy
  );
  return { sut, emailServiceSpy };
};

describe("SendNewsletterToSubscribedUsers", () => {
  test("Should not send email with newsletter if there are no subscribed users", async () => {
    const userList: User[] = [];
    const path: string = "test_path";
    const context: Context = {
      title: "title_test",
      username: "username_test",
      text: "text_test",
    };

    const { sut } = makeSut(userList);
    await sut.sendNewsletterToSubscribedUsers(path, context);

    expect(EmailServiceSpy.sendFuctionWasCalled).toBeFalsy();
  });

  test("Should send email with newsletter", async () => {
    const userData: UserData = { name: "name_test", email: "email_test@email.com" };
    const userList: User[] = [User.create(userData)];
    const path: string = "test_path";
    const context: Context = {
      title: "title_test",
      username: "username_test",
      text: "text_test",
    };

    const { sut } = makeSut(userList);
    await sut.sendNewsletterToSubscribedUsers(path, context);

    expect(EmailServiceSpy.sendFuctionWasCalled).toBeTruthy();
  });

  test("Should throw if send method throws", async () => {
    const userData: UserData = { name: "name_test", email: "email_test@email.com" };
    const userList: User[] = [User.create(userData)];
    const path: string = "test_path";
    const context: Context = {
      title: "title_test",
      username: "username_test",
      text: "text_test",
    };

    const { sut, emailServiceSpy } = makeSut(userList);

    jest.spyOn(emailServiceSpy, "send").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.sendNewsletterToSubscribedUsers(path, context);

    expect(promise).rejects.toThrow(EmailServiceError);
  });
});
