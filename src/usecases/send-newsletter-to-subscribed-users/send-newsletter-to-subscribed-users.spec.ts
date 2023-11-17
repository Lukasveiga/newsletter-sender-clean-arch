import { InMemoryUserRepository } from "./../in-memory-user-repository/in-memory-user-repository";
import { EmailOptions, EmailService } from "../ports/email-service";
import { Context, HtmlCompiler } from "../ports/html-compiler";
import { UserRepository } from "../ports/user-repository";
import { User } from "../../entities/user/user";
import { SendNewsletterToSubscribedUsers } from "./send-newsletter-to-subscribed-users";

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
  send(options: EmailOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

class HtmlCompilerSpy implements HtmlCompiler {
  compile(path: string, context: Context): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

const makeSut = (userList: User[]): { sut: SendNewsletterToSubscribedUsers } => {
  const inMemoryUserRpository: UserRepository = new InMemoryUserRepository(userList);
  const emailServiceSpy = new EmailServiceSpy();
  const htmlCompilerSpy = new HtmlCompilerSpy();
  const sut = new SendNewsletterToSubscribedUsers(
    inMemoryUserRpository,
    emailServiceSpy,
    emailOptions,
    htmlCompilerSpy
  );
  return { sut };
};

describe("SendNewsletterToSubscribedUsers", () => {
  test("", () => {});
});
