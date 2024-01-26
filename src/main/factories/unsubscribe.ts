import { MongoDBUserRepository } from "../../infra/repository/mongodb-user-repository";
import { UnsubscribeUserController } from "../../presenters/controllers/unsubscribe-user-controller";
import { UnsubscribeUserFromNewsletterList } from "../../usecases/unsubscribe-user-of-newsletter-list/unsubscribe-user-from-newsletter-list";

export const makeUnsubscribeUserController = (): UnsubscribeUserController => {
  const mongoDBUserRepository = new MongoDBUserRepository();
  const unsubscribeUserFromNewsletterList = new UnsubscribeUserFromNewsletterList(
    mongoDBUserRepository
  );
  const unsubscribeUserController = new UnsubscribeUserController(
    unsubscribeUserFromNewsletterList
  );
  return unsubscribeUserController;
};
