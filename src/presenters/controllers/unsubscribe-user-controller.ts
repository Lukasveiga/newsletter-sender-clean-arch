import { InfraError } from "../../infra/errors/infra-error";
import { UsecaseError } from "../../usecases/errors/usecase-error";
import { UnsubscribeUser } from "./../../usecases/unsubscribe-user-of-newsletter-list/unsubscribe-user";
import { invalidToken, notFound, ok, serverError } from "./helpers/http-helper";
import { HttpRequest, HttpResponse } from "./ports/http";
import "dotenv/config";

export class UnsubscribeUserController {
  constructor(private unsubscribeUser: UnsubscribeUser) {}

  async unsubscribe(httpRequest: HttpRequest): Promise<HttpResponse> {
    const token = httpRequest.query.token;
    try {
      await this.unsubscribeUser.unsubscribeUserFromNewsletterList(
        token,
        process.env.SECRET_KEY as string
      );
      const path = __dirname + "/templates/unsubscribe-page.html";
      return ok({ path });
    } catch (error) {
      if (error instanceof UsecaseError) {
        return notFound(error);
      }

      if (error instanceof InfraError) {
        return invalidToken(error);
      }

      return serverError();
    }
  }
}
