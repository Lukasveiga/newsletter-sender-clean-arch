import { InMemoryUserRepository } from "./../../usecases/in-memory-user-repository/in-memory-user-repository";
import { UnsubscribeUserController } from "./unsubscribe-user-controller";
import { UnsubscribeUserFromNewsletterList } from "../../usecases/unsubscribe-user-of-newsletter-list/unsubscribe-user-from-newsletter-list";
import { User } from "../../entities/user/user";

const userTest: User = User.create({ name: "test_name", email: "test_email@email.com" });

const makeSut = () => {
  const userList: User[] = [userTest];
  const inMemoryUserRepository = new InMemoryUserRepository(userList);
  const unsubscribeUserFromNewsletterList = new UnsubscribeUserFromNewsletterList(
    inMemoryUserRepository
  );
  const sut = new UnsubscribeUserController(unsubscribeUserFromNewsletterList);

  return { sut, unsubscribeUserFromNewsletterList, inMemoryUserRepository };
};

describe("UnsubscribeUserController", () => {
  test("Should return status code 400 when email is not provided", async () => {
    const httpRequest = {
      body: {
        email: "",
      },
    };

    const { sut } = makeSut();
    const httpResponse = await sut.unsubscribe(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body.message).toEqual("email is required");
  });

  test("Should return status code 404 when user is not found", async () => {
    const httpRequest = {
      body: {
        email: "any_email",
      },
    };

    const { sut } = makeSut();
    const httpResponse = await sut.unsubscribe(httpRequest);
    expect(httpResponse.statusCode).toEqual(404);
    expect(httpResponse.body.message).toEqual("User not found");
  });

  test("Should return status code 500 when UnsubscribeUserFromNewsletterList throws unexpected error", async () => {
    const httpRequest = {
      body: {
        email: "any_email",
      },
    };

    const { sut, unsubscribeUserFromNewsletterList } = makeSut();

    jest
      .spyOn(unsubscribeUserFromNewsletterList, "unsubscribeUserFromNewsletterList")
      .mockImplementation(() => {
        throw new Error();
      });

    const httpResponse = await sut.unsubscribe(httpRequest);
    expect(httpResponse.statusCode).toEqual(500);
    expect(httpResponse.body.message).toEqual("Internal Server Error");
  });

  test("Should return status code 200 when user is successfully unsubscribed", async () => {
    const httpRequest = {
      body: {
        email: userTest.email,
      },
    };

    const { sut } = makeSut();

    expect(userTest.isSubscribed()).toBeTruthy();

    const httpResponse = await sut.unsubscribe(httpRequest);

    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse.body.message).toEqual("User unsubscribed");
    expect(userTest.isSubscribed()).toBeFalsy();
  });
});
