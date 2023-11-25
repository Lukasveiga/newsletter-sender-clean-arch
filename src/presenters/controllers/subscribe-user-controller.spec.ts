import { SubscribeUserController } from "./subscribe-user-controller";
import { SubscribeUserOnNewsletterList } from "../../usecases/subscribe-user-on-newsletter-list/subscribe-user-on-newsletter-list";
import { InMemoryUserRepository } from "../../usecases/in-memory-user-repository/in-memory-user-repository";
import { User } from "../../entities/user/user";
import { HttpRequest } from "./ports/http";
import { UserData } from "../../entities/user/user-data";

const makeSut = () => {
  const userlist: User[] = [];
  const inMemoryUserRepository = new InMemoryUserRepository(userlist);
  const subscribeUserOnNewsletterList = new SubscribeUserOnNewsletterList(inMemoryUserRepository);
  const sut = new SubscribeUserController(subscribeUserOnNewsletterList);
  return { sut, subscribeUserOnNewsletterList };
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
    const invalidName = "c";

    const httpRequest: HttpRequest = {
      body: {
        name: invalidName,
        email: "any_email@email.com",
      },
    };

    const { sut } = makeSut();

    const httpRespose = await sut.subscribe(httpRequest);
    expect(httpRespose.statusCode).toEqual(400);
    expect(httpRespose.body).toEqual("User name is invalid");
  });

  test("Should return status code 400 when invalid user email is provided", async () => {
    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
        email: "invalid_email",
      },
    };

    const { sut } = makeSut();

    const httpRespose = await sut.subscribe(httpRequest);
    expect(httpRespose.statusCode).toEqual(400);
    expect(httpRespose.body).toEqual("User email is invalid");
  });

  test("Should return status code 500 when subscribeUserOnNewsletterList throws unexpected error", async () => {
    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
        email: "any_email@email.com",
      },
    };

    const { sut, subscribeUserOnNewsletterList } = makeSut();

    jest
      .spyOn(subscribeUserOnNewsletterList, "subscribeUserOnNewsletterList")
      .mockImplementation(() => {
        throw new Error();
      });

    const httpRespose = await sut.subscribe(httpRequest);
    expect(httpRespose.statusCode).toEqual(500);
    expect(httpRespose.body).toEqual("Internal Server Error");
  });

  test("Should return status code 200 when valid params are provided", async () => {
    const userData: UserData = {
      name: "valid_name",
      email: "valid_email@email.com",
    };

    const httpRequest: HttpRequest = {
      body: userData,
    };

    const { sut } = makeSut();

    const httpRespose = await sut.subscribe(httpRequest);
    expect(httpRespose.statusCode).toEqual(200);
    expect(httpRespose.body).toEqual(userData);
  });
});
