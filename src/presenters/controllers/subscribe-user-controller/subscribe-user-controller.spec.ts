import { SubscribeUserController } from "./subscribe-user-controller";
import { SubscribeUserOnNewsletterList } from "../../../usecases/subscribe-user-on-newsletter-list/subscribe-user-on-newsletter-list";
import { InMemoryUserRepository } from "../../../usecases/in-memory-user-repository/in-memory-user-repository";
import { User } from "../../../entities/user/user";
import { HttpRequest } from "../ports/http";

const makeSut = () => {
  const userlist: User[] = [];
  const inMemoryUserRepository = new InMemoryUserRepository(userlist);
  const subscribeUserOnNewsletterListSpy = new SubscribeUserOnNewsletterList(
    inMemoryUserRepository
  );
  const sut = new SubscribeUserController(subscribeUserOnNewsletterListSpy);
  return { sut, subscribeUserOnNewsletterListSpy };
};

describe("SubscribeUserController", () => {
  test("Should return status code 400 when user name is not provided", async () => {
    const httpRequest: HttpRequest = {
      body: {
        email: "any_email@email.com",
      },
    };

    const { sut } = makeSut();

    const httpRespose = await sut.subscribe(httpRequest);
    expect(httpRespose.statusCode).toEqual(400);
    expect(httpRespose.body).toEqual("name is required");
  });

  test("Should return status code 400 when user email is not provided", async () => {
    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
      },
    };

    const { sut } = makeSut();

    const httpRespose = await sut.subscribe(httpRequest);
    expect(httpRespose.statusCode).toEqual(400);
    expect(httpRespose.body).toEqual("email is required");
  });

  test("Should return status code 400 when invalid user name is provided", async () => {
    const httpRequest: HttpRequest = {
      body: {
        name: "c",
        email: "any_email@email.com",
      },
    };

    const { sut } = makeSut();

    const httpRespose = await sut.subscribe(httpRequest);
    expect(httpRespose.statusCode).toEqual(400);
    expect(httpRespose.body).toEqual("User name is invalid");
  });
});
