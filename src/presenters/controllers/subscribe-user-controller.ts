import { DomainError } from "../../entities/user/errors/domain-error";
import { UserData } from "../../entities/user/user-data";
import { SubscribeUser } from "../../usecases/subscribe-user-on-newsletter-list/subscribe-user";
import { MissingParamError } from "./errors/missing-param-error";
import { badRequest, ok, serverError } from "./helpers/http-helper";
import { HttpRequest, HttpResponse } from "./ports/http";

export class SubscribeUserController {
  constructor(private subscribeUser: SubscribeUser) {}

  async subscribe(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email || !httpRequest.body.name) {
      const param = !httpRequest.body.email ? "email" : "name";
      return badRequest(new MissingParamError(param));
    }

    try {
      const userData: UserData = { name: httpRequest.body.name, email: httpRequest.body.email };
      await this.subscribeUser.subscribeUserOnNewsletterList(userData);
      return ok(userData);
    } catch (error) {
      if (error instanceof DomainError) {
        return badRequest(error);
      }
      console.error(error);
      return serverError();
    }
  }
}
