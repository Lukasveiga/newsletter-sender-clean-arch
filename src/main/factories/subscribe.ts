import { MongoDBUserRepository } from "../../infra/repository/mongodb-user-repository";
import { SubscribeUserController } from "../../presenters/controllers/subscribe-user-controller";
import { SubscribeUserOnNewsletterList } from "../../usecases/subscribe-user-on-newsletter-list/subscribe-user-on-newsletter-list";

export const makeSubscribeUserController = (): SubscribeUserController => {
  const mongoDBUserRepository = new MongoDBUserRepository();
  const subscribeUserOnNewsletterList = new SubscribeUserOnNewsletterList(mongoDBUserRepository);
  const subscribeUserController = new SubscribeUserController(subscribeUserOnNewsletterList);
  return subscribeUserController;
};
