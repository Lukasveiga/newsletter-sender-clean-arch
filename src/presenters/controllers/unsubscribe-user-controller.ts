import { UsecaseError } from "../../usecases/errors/usecase-error";
import { UnsubscribeUser } from "./../../usecases/unsubscribe-user-of-newsletter-list/unsubscribe-user";
import { MissingParamError } from "./errors/missing-param-error";
import { badRequest, notFound, ok, serverError } from "./helpers/http-helper";
import { HttpRequest, HttpResponse } from "./ports/http";

export class UnsubscribeUserController {
  constructor(private unsubscribeUser: UnsubscribeUser) {}

  async unsubscribe(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }

    try {
      await this.unsubscribeUser.unsubscribeUserFromNewsletterList(httpRequest.body.email);
      return ok({ message: "User unsubscribed" });
    } catch (error) {
      if (error instanceof UsecaseError) {
        return notFound(error);
      }
      return serverError();
    }
  }
}
