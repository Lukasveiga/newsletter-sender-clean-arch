import { SubscribeUserController } from "./subscribe-user-controller";
import { SubscribeUserOnNewsletterList } from "../../../usecases/subscribe-user-on-newsletter-list/subscribe-user-on-newsletter-list";
import { InMemoryUserRepository } from "../../../usecases/in-memory-user-repository/in-memory-user-repository";
import { User } from "../../../entities/user/user";

const makeSut = (userlist: User[]) => {
  const inMemoryUserRepository = new InMemoryUserRepository(userlist);
  const subscribeUserOnNewsletterListSpy = new SubscribeUserOnNewsletterList(
    inMemoryUserRepository
  );
  const sut = new SubscribeUserController(subscribeUserOnNewsletterListSpy);
  return { sut, subscribeUserOnNewsletterListSpy };
};

describe("SubscribeUserController", () => {
  test("Should return status code 400 when user name is not provided", async () => {});
});
