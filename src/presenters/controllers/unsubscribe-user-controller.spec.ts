import { InMemoryUserRepository } from "./../../usecases/in-memory-user-repository/in-memory-user-repository";
import { UnsubscribeUserController } from "./unsubscribe-user-controller";
import { UnsubscribeUserFromNewsletterList } from "../../usecases/unsubscribe-user-of-newsletter-list/unsubscribe-user-from-newsletter-list";
import { User } from "../../entities/user/user";

const makeSut = () => {
  const userList: User[] = [User.create({ name: "test_name", email: "test_email@email.com" })];
  const inMemoryUserRepository = new InMemoryUserRepository(userList);
  const unsubscribeUser = new UnsubscribeUserFromNewsletterList(inMemoryUserRepository);
  const sut = new UnsubscribeUserController(unsubscribeUser);

  return { sut, unsubscribeUser };
};

describe("UnsubscribeUserController", () => {
  test("Should return status code 400 if email is not provided", async () => {
    const httpRequest = {
      body: {
        email: "",
      },
    };

    const { sut } = makeSut();
    const httpResponse = await sut.unsubscribe(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual("email is required");
  });
});
