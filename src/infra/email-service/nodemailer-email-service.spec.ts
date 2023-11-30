import { NodemailerEmailService } from "./nodemailer-email-service";
import { EmailOptions } from "./../../usecases/ports/email-service";
import { EmailServiceError } from "../../usecases/errors/email-service-error";

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

const sendMailMock = jest.fn().mockReturnValue("sent");
jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: sendMailMock,
  })),
}));

const nodemailer = require("nodemailer");

beforeEach(() => {
  sendMailMock.mockClear();
  nodemailer.createTransport.mockClear();
});

describe("NodemailerEmailService", () => {
  test("Should throw if nodemailer throws", async () => {
    const sut = new NodemailerEmailService();

    sendMailMock.mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.send(emailOptions);
    expect(promise).rejects.toThrow(new EmailServiceError());
  });
});
