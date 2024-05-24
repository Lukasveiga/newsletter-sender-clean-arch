import { MongoDBUserRepository } from "../../infra/repository/mongodb-user-repository";
import { JwtToken } from "../../infra/token/jwt-token";
import { UnsubscribeUserController } from "../../presenters/controllers/unsubscribe-user-controller";
import { UnsubscribeUserFromNewsletterList } from "../../usecases/unsubscribe-user-of-newsletter-list/unsubscribe-user-from-newsletter-list";

export const makeUnsubscribeUserController = (): UnsubscribeUserController => {
  const mongoDBUserRepository = new MongoDBUserRepository();
  const jwtToken = new JwtToken();
  const unsubscribeUserFromNewsletterList = new UnsubscribeUserFromNewsletterList(
    mongoDBUserRepository,
    jwtToken
  );
  const unsubscribeUserController = new UnsubscribeUserController(
    unsubscribeUserFromNewsletterList
  );
  return unsubscribeUserController;
};
