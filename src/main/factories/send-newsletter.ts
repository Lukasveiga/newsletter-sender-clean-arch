import { NodemailerEmailService } from "../../infra/email-service/nodemailer-email-service";
import { HandlebarsHtmlCompilerService } from "../../infra/html-compiler-service/handlebars-html-compiler-service";
import { MongoDBUserRepository } from "../../infra/repository/mongodb-user-repository";
import { SendNewsletterController } from "../../presenters/controllers/send-newsletter-controller";
import { SendNewsletterToSubscribedUsers } from "../../usecases/send-newsletter-to-subscribed-users/send-newsletter-to-subscribed-users";
import { getEmailOptions } from "../config/email";

export const makeSendNewsletterController = (): SendNewsletterController => {
  const mongoDBUserRepository = new MongoDBUserRepository();
  const nodemailerEmailService = new NodemailerEmailService();
  const handlebarsHtmlCompilerService = new HandlebarsHtmlCompilerService();
  const sendNewsletterToSubscribedUsers = new SendNewsletterToSubscribedUsers(
    mongoDBUserRepository,
    nodemailerEmailService,
    getEmailOptions(),
    handlebarsHtmlCompilerService
  );
  const sendNewsletterController = new SendNewsletterController(sendNewsletterToSubscribedUsers);
  return sendNewsletterController;
};
