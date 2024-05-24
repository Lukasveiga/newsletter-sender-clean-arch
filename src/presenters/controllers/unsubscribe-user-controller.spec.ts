import { InvalidTokenError } from "./../../infra/errors/token-error";
import { UserNotFound } from "./../../usecases/errors/user-repository-error";
import { UnsubscribeUserController } from "./unsubscribe-user-controller";
import { UnsubscribeUser } from "./../../usecases/unsubscribe-user-of-newsletter-list/unsubscribe-user";
import "dotenv/config";

class UnsubscribeUserSpy implements UnsubscribeUser {
  async unsubscribeUserFromNewsletterList(token: string, secretKey: string): Promise<void> {}
}

const makeSut = () => {
  const unsubscribeUser = new UnsubscribeUserSpy();
  const sut = new UnsubscribeUserController(unsubscribeUser);

  return { sut, unsubscribeUser };
};

describe("UnsubscribeUserController", () => {
  test("unsubscribe return status code 200 and template path", async () => {
    const httpRequest = {
      query: {
        token: "token",
      },
    };

    const { sut, unsubscribeUser } = makeSut();

    jest.spyOn(unsubscribeUser, "unsubscribeUserFromNewsletterList").mockResolvedValue();

    const response = await sut.unsubscribe(httpRequest);

    expect(response.statusCode).toEqual(200);
    expect(response.body.path).toEqual(__dirname + "/templates/unsubscribe-page.html");
  });

  test("unsubscribeUser service is called with correct params", async () => {
    const httpRequest = {
      query: {
        token: "token",
      },
    };

    const { sut, unsubscribeUser } = makeSut();

    const unsubscribeUserSpy = jest.spyOn(unsubscribeUser, "unsubscribeUserFromNewsletterList");

    await sut.unsubscribe(httpRequest);

    expect(unsubscribeUserSpy).toHaveBeenCalledWith("token", process.env.secretKey as string);
  });

  test("unsubscribe return status 404 and message for user not found error", async () => {
    const httpRequest = {
      query: {
        token: "token",
      },
    };

    const { sut, unsubscribeUser } = makeSut();

    jest
      .spyOn(unsubscribeUser, "unsubscribeUserFromNewsletterList")
      .mockRejectedValue(new UserNotFound());

    const response = await sut.unsubscribe(httpRequest);
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("User not found");
  });

  test("unsubscribe return status 498 and message for invalid token error", async () => {
    const httpRequest = {
      query: {
        token: "token",
      },
    };

    const { sut, unsubscribeUser } = makeSut();

    jest
      .spyOn(unsubscribeUser, "unsubscribeUserFromNewsletterList")
      .mockRejectedValue(new InvalidTokenError());

    const response = await sut.unsubscribe(httpRequest);
    expect(response.statusCode).toEqual(498);
    expect(response.body.message).toEqual("Invalid Token Error");
  });

  test("unsubscribe return status 500 and message for internal sever error", async () => {
    const httpRequest = {
      query: {
        token: "token",
      },
    };

    const { sut, unsubscribeUser } = makeSut();

    jest
      .spyOn(unsubscribeUser, "unsubscribeUserFromNewsletterList")
      .mockRejectedValue(new Error("Random error"));

    const response = await sut.unsubscribe(httpRequest);
    expect(response.statusCode).toEqual(500);
    expect(response.body.message).toEqual("Internal Server Error");
  });
});
