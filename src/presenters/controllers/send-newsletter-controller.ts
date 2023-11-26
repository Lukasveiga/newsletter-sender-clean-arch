import { SendNewsletter } from "../../usecases/send-newsletter-to-subscribed-users/send-newsletter";
import { ok, serverError } from "./helpers/http-helper";
import { HttpResponse } from "./ports/http";

export class SendNewsletterController {
  constructor(private sendNewsletter: SendNewsletter) {}

  async send(): Promise<HttpResponse> {
    try {
      const path = __dirname + "/templates/newsletter.html";
      await this.sendNewsletter.sendNewsletterToSubscribedUsers(path);
      return ok("Newsletters sent successfully");
    } catch (error) {
      return serverError();
    }
  }
}
